<script setup lang="ts">
export type PaintLineWidthProps = {
  color?: string
  alpha?: number
  lineWidths?: number[]
}

export type PaintLineWidthEmits = {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', opened: boolean): void
  (e: 'select', selected: number): void
}

withDefaults(defineProps<PaintLineWidthProps>(), {
  color: '#000000',
  alpha: 1,
  lineWidths: () => [
    2,
    4,
    6,
    8,
    10,
    14
  ]
})

const emits = defineEmits<PaintLineWidthEmits>()

const selected = ref<number>(4)
const opened = ref<boolean>(false)

const open = () => {
  opened.value = true
  emits('open')
}

const close = () => {
  opened.value = false
  emits('close')
}

const toggle = () => {
  opened.value = !opened.value
  emits('toggle', opened.value)
}

const select = (lineWidth: number) => {
  close()
  selected.value = lineWidth
  emits('select', selected.value)
}

const start = () => {
  selected.value = 4
}

defineExpose({
  selected,
  opened,
  open,
  close,
  toggle,
  start
})
</script>

<template>
  <div
    class="activity-paint-line-width"
    relative
  >
    <button
      class="activity-paint-line-width-selector"
      type="button"
      cursor-pointer
      mx-auto
      flex
      justify-center
      ring-4
      ring-gray-200
      items-center
      border
      border-solid
      border-gray-300
      bg-white
      rounded
      w-10
      h-10
      @click="toggle()"
    >
      <div
        class="activity-paint-line-width-selector-line"
        :style="`background-color: ${color}; width: ${selected}px; opacity: ${alpha};`"
        border
        border-solid
        border-gray-300
        h-6
      />
    </button>
    <div
      v-show="opened"
      class="activity-paint-line-width-container"
      right--2
      mt-2
      w-14
      absolute
      grid
      grid-cols-1
      gap-2
      bg-white
      rounded-xl
      shadow-xl
      p-2
    >
      <button
        v-for="lineWidth in lineWidths"
        :key="lineWidth"
        class="activity-paint-line-width-item"
        type="button"
        cursor-pointer
        mx-auto
        flex
        justify-center
        items-center
        border
        border-solid
        border-gray-300
        bg-white
        rounded
        w-10
        h-10
        @click="select(lineWidth)"
      >
        <div
          class="activity-paint-line-width-item-line"
          :style="`background-color: ${color}; width: ${lineWidth}px; opacity: ${alpha};`"
          border
          border-solid
          border-gray-300
          h-6
        />
      </button>
    </div>
  </div>
</template>
