<script setup lang="ts">
export interface PaintLineWidthProps {
  color?: string
  alpha?: number
  options?: number[]
}

withDefaults(defineProps<PaintLineWidthProps>(), {
  color: '#000000',
  alpha: 1,
  options: () => [
    2,
    4,
    6,
    8,
    10,
    14
  ]
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', openned: boolean): void
  (e: 'select', selected: number): void
}>()

const selected = ref<number>(4)
const openned = ref<boolean>(false)

const open = () => {
  openned.value = true
  emits('open')
}

const close = () => {
  openned.value = false
  emits('close')
}

const toggle = () => {
  openned.value = !openned.value
  emits('toggle', openned.value)
}

const select = (option: number) => {
  close()
  selected.value = option
  emits('select', selected.value)
}

const prepare = () => {
  selected.value = 4
}

defineExpose({
  selected,
  openned,
  open,
  close,
  toggle,
  prepare
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
      border-gray-300
      bg-white
      rounded
      w-10
      h-10
      @click="toggle"
    >
      <div
        class="activity-paint-line-width-selector-line"
        :style="`background-color: ${color}; width: ${selected}px; opacity: ${alpha};`"
        border
        border-gray-300
        h-6
      />
    </button>
    <div
      v-show="openned"
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
        v-for="option in options"
        :key="option"
        class="activity-paint-line-width-option"
        type="button"
        cursor-pointer
        mx-auto
        flex
        justify-center
        items-center
        border
        border-gray-300
        bg-white
        rounded
        w-10
        h-10
        @click="select(option)"
      >
        <div
          class="activity-paint-line-width-option-line"
          :style="`background-color: ${color}; width: ${option}px; opacity: ${alpha};`"
          border
          border-gray-300
          h-6
        />
      </button>
    </div>
  </div>
</template>
