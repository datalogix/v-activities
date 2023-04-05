<script setup lang="ts">
import { Buffer } from 'buffer'
import printJS from 'print-js'
import Activity from '../Activity.vue'
import Eraser from './Eraser.vue'
import Color from './Color.vue'
import LineWidth from './LineWidth.vue'
import Alpha from './Alpha.vue'
import Cursor from './Cursor.vue'
import PaintSvg from './PaintSvg.vue'
import PaintImage from './PaintImage.vue'

export interface PaintProps {
  image: string,
  imageToCompare?: string
  colors?: string[]
  erasers?: number[]
  lineWidths?: number[]
  alphas?: number[]
}

export interface PaintAnswer {
  image: string
}

const props = defineProps<PaintProps>()
const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<PaintAnswer>()
const eraser = ref<InstanceType<typeof Eraser>>()
const color = ref<InstanceType<typeof Color>>()
const lineWidth = ref<InstanceType<typeof LineWidth>>()
const alpha = ref<InstanceType<typeof Alpha>>()
const paintSvg = ref<InstanceType<typeof PaintSvg>>()
const paintImage = ref<InstanceType<typeof PaintImage>>()
const isSvg = ref(false)
const painter = computed(() => isSvg.value ? paintSvg.value : paintImage.value)
const painted = ref<string | null>(null)

const closeAll = (el: unknown = null) => {
  if (el !== eraser.value) eraser.value?.close()
  if (el !== color.value) color.value?.close()
  if (el !== alpha.value) alpha.value?.close()
  if (el !== lineWidth.value) lineWidth.value?.close()
}

const init = () => {
  const content = activity.value?.loader.get(props.image)

  if (
    typeof content === 'string' &&
    (content.startsWith('data:image/svg+xml') || props.image.toString().endsWith('.svg'))
  ) {
    isSvg.value = true

    // @ts-ignore
    return painter.value?.init(props.image.toString().endsWith('.svg')
      ? content
      : Buffer.from(content.replace('data:image/svg+xml;base64,', ''), 'base64').toString()
    )
  }

  if (content instanceof HTMLImageElement) {
    isSvg.value = false
    // @ts-ignore
    return painter.value?.init(content)
  }

  if (typeof content === 'string') {
    isSvg.value = false

    const img = new Image()
    // @ts-ignore
    img.onload = () => painter.value?.init(img)
    img.src = content
  }
}

const start = () => {
  answer.value = { image: '' }
  painter.value?.start()
  eraser.value?.start()
  color.value?.start()
  lineWidth.value?.start()
  alpha.value?.start()
}

const answered = (_answer: unknown) => {
  painted.value = (_answer as PaintAnswer).image
}

const check = async () => {
  if (!props.imageToCompare || !painter.value) {
    return null
  }

  const imageToCompareContent = activity.value?.loader.get(props.imageToCompare)

  if (imageToCompareContent === null || imageToCompareContent === undefined) {
    return null
  }

  try {
    answer.value = {
      image: String(painter.value.generateImage())
    }

    // @ts-ignore
    await import('jimp/browser/lib/jimp')

    // @ts-ignore
    const jimp = window.Jimp
    const image1 = await jimp.read(imageToCompareContent)
    const image2 = await jimp.read(answer.value.image)
    const diff = jimp.compareHashes(image1.pHash(), image2.pHash())

    return activity.value?.store({
      percentage: diff > 0.02 ? 0 : 100,
      result: !(diff > 0.02)
    })
  } catch (error) {
    return activity.value?.openMessage({
      type: 'error',
      content: String(error)
    })
  }
}

const save = () => {
  const img = new Image()
  img.src = String(painter.value?.generateImage())
  img.onload = async () => {
    const canvasTemp = document.createElement('canvas')
    const context = canvasTemp.getContext('2d')

    canvasTemp.width = 800
    canvasTemp.height = 400

    if (context) {
      context.clearRect(0, 0, canvasTemp.width, canvasTemp.height)
      context.drawImage(img, 0, 0)
    }

    const image = canvasTemp.toDataURL('image/png')
    const a = document.createElement('a')

    a.setAttribute('download', 'paint.png')
    a.setAttribute('href', image)
    a.setAttribute('target', '_blank')
    a.click()

    answer.value = { image }

    await activity.value?.store()
    await activity.value?.start()
  }
}

const print = () => {
  printJS({ printable: painter.value?.generateImage(), type: 'image' })
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="paint"
    :options="props"
    :load="[props.image, props.imageToCompare]"
    :can-check="!!props.imageToCompare"
    @init="init"
    @start="start"
    @answered="answered"
    @check="check"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <img
      v-if="painted"
      :src="painted"
      class="mx-auto"
    >

    <Cursor
      v-if="!painted"
      :eraser="eraser?.active"
      :color="color?.selected"
      :line-width="lineWidth?.selected"
      :alpha="alpha?.selected"
    >
      <div
        mb-4
        flex
        space-x-4
        items-center
        justify-end
      >
        <Eraser
          v-show="!isSvg"
          ref="eraser"
          :options="erasers"
          @toggle="closeAll(eraser);eraser?.enable();"
          @select="closeAll()"
        />

        <Color
          ref="color"
          :options="colors"
          :alpha="alpha?.selected"
          @toggle="closeAll(color);eraser?.disable();"
          @select="closeAll()"
        />

        <LineWidth
          v-show="!isSvg"
          ref="lineWidth"
          :options="lineWidths"
          :color="color?.selected"
          :alpha="alpha?.selected"
          @toggle="closeAll(lineWidth);eraser?.disable();"
          @select="closeAll()"
        />

        <Alpha
          v-show="!isSvg"
          ref="alpha"
          :options="alphas"
          :color="color?.selected"
          @toggle="closeAll(alpha);eraser?.disable();"
          @select="closeAll()"
        />
      </div>

      <PaintSvg
        v-show="isSvg"
        ref="paintSvg"
        :color="color?.selected"
      />

      <PaintImage
        v-show="!isSvg"
        ref="paintImage"
        :eraser="eraser?.active ? eraser?.selected : undefined"
        :color="color?.selected"
        :line-width="lineWidth?.selected"
        :alpha="alpha?.selected"
      />
    </Cursor>

    <template
      v-if="!painted"
      #activity-actions
    >
      <Button
        class="activity-button-save"
        text-white
        bg-teal-500
        icon="i-mdi-content-save"
        text="Salvar"
        @click="save()"
      />

      <Button
        class="activity-button-print"
        text-white
        bg-purple-500
        icon="i-mdi-printer"
        text="Imprimir"
        @click="print()"
      />
    </template>
  </Activity>
</template>
