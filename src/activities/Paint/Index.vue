<script setup lang="ts">
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
const isSvg = computed(() => props.image.split('.').pop() === 'svg')
const painter = computed(() => isSvg.value ? paintSvg.value : paintImage.value)
const painted = ref<string | null>(null)

const closeAll = (el: unknown = null) => {
  if (el !== eraser.value) eraser.value?.close()
  if (el !== color.value) color.value?.close()
  if (el !== alpha.value) alpha.value?.close()
  if (el !== lineWidth.value) lineWidth.value?.close()
}

const init = () => {
  // @ts-ignore
  painter.value?.init(activity.value?.loader.get(props.image))
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

  try {
    answer.value = {
      image: String(painter.value.generateImage())
    }

    // @ts-ignore
    await import('jimp/browser/lib/jimp')

    // @ts-ignore
    const jimp = window.Jimp
    const image1 = await jimp.read(props.imageToCompare)
    const image2 = await jimp.read(answer.value.image)
    const diff = jimp.compareHashes(image1.pHash(), image2.pHash())

    return activity.value?.store({
      percentage: diff > 0.02 ? 0 : 100,
      result: !(diff > 0.02)
    })
  } catch (e) {
    return activity.value?.error(e)
  }
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    class="activity-paint"
    :load="[props.image]"
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
      <Action
        class="activity-action-save"
        text-white
        bg-teal-500
        icon="i-mdi-content-save"
        text="Salvar"
        @click="painter?.save()"
      />

      <Action
        class="activity-action-print"
        text-white
        bg-purple-500
        icon="i-mdi-printer"
        text="Imprimir"
        @click="painter?.print()"
      />
    </template>
  </Activity>
</template>
