<script setup lang="ts">
import { computed, ref } from 'vue'
import Activity from '../Activity.vue'
import Eraser from './Eraser.vue'
import Color from './Color.vue'
import LineWidth from './LineWidth.vue'
import Alpha from './Alpha.vue'
import Cursor from './Cursor.vue'
import SVG from './SVG.vue'
import Image from './Image.vue'

export interface PaintProps {
  image: string,
  colors?: string[]
  erasers?: number[]
  lineWidths?: number[]
  alphas?: number[]
}

const props = defineProps<PaintProps>()
const activity = ref<InstanceType<typeof Activity>>()
const eraser = ref<InstanceType<typeof Eraser>>()
const color = ref<InstanceType<typeof Color>>()
const lineWidth = ref<InstanceType<typeof LineWidth>>()
const alpha = ref<InstanceType<typeof Alpha>>()
const svg = ref<InstanceType<typeof SVG>>()
const image = ref<InstanceType<typeof Image>>()

const isSVG = computed(() => props.image.split('.').pop() === 'svg')
const painter = computed(() => isSVG.value ? svg.value : image.value)

const save = () => {
  painter.value?.save()
}

const print = () => {
  painter.value?.print()
}

const init = () => {
  painter.value?.init(activity.value?.loader.get(props.image))
}

const prepare = () => {
  painter.value?.prepare()
  eraser.value?.prepare()
  color.value?.prepare()
  lineWidth.value?.prepare()
  alpha.value?.prepare()
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-paint"
    :display-check="false"
    :load="[props.image]"
    @init="init"
    @prepare="prepare"
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

    <template #activity-actions>
      <ButtonsSave
        w-full
        @click="save"
      />
      <ButtonsPrint
        w-full
        @click="print"
      />
    </template>

    <Cursor
      :eraser="eraser?.active"
      :color="color?.selected"
      :line-width="lineWidth?.selected"
      :alpha="alpha?.selected"
    >
      <div
        mb-6
        flex
        space-x-4
        items-center
        justify-end
      >
        <Eraser
          v-show="!isSVG"
          ref="eraser"
          :options="props.erasers"
          @toggle="eraser?.enable();"
          @select="eraser?.close();color?.close();alpha?.close();lineWidth?.close();"
        />

        <Color
          ref="color"
          :options="props.colors"
          :alpha="alpha?.selected"
          @toggle="eraser?.disable();"
          @select="eraser?.close();color?.close();alpha?.close();lineWidth?.close();"
        />

        <LineWidth
          v-show="!isSVG"
          ref="lineWidth"
          :options="props.lineWidths"
          :color="color?.selected"
          :alpha="alpha?.selected"
          @toggle="eraser?.disable();"
          @select="eraser?.close();color?.close();alpha?.close();lineWidth?.close();"
        />

        <Alpha
          v-show="!isSVG"
          ref="alpha"
          :options="props.alphas"
          :color="color?.selected"
          @toggle="eraser?.disable();"
          @select="eraser?.close();color?.close();alpha?.close();lineWidth?.close();"
        />
      </div>

      <SVG
        v-show="isSVG"
        ref="svg"
        :image="props.image"
        :color="color?.selected"
      />

      <Image
        v-show="!isSVG"
        ref="image"
        :image="props.image"
        :eraser="eraser?.active ? eraser?.selected : undefined"
        :color="color?.selected"
        :line-width="lineWidth?.selected"
        :alpha="alpha?.selected"
      />
    </Cursor>
  </Activity>
</template>
