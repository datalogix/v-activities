<script setup lang="ts">
import { ref } from 'vue'

export interface PaintAlphaProps {
  color?: string
  options?: number[]
}

const props = withDefaults(defineProps<PaintAlphaProps>(), {
  color: '#000000',
  options: () => [
    0.2,
    0.4,
    0.6,
    0.8,
    1
  ]
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', openned: boolean): void
  (e: 'select', selected: number): void
}>()

const selected = ref<number>(1)
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
  selected.value = 1
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
    class="activity-paint-alpha"
    relative
  >
    <button
      :style="`background-color: ${props.color}; opacity: ${selected};`"
      class="activity-paint-alpha-selector"
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
      rounded-xl
      w-10
      h-10
      @click="toggle"
    >
      <i
        :class="{
          'text-white': !['#ffffff', '#fff'].includes(props.color.toLocaleLowerCase())
        }"
        class="activity-paint-alpha-selector-icon"
        w-6
        h-6
        i-mdi-opacity
      />
    </button>
    <div
      v-show="openned"
      class="activity-paint-alpha-container"
      right--2
      mt-2
      w-10
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
        v-for="option in props.options"
        :key="option"
        class="activity-paint-alpha-option"
        :style="`background-color: ${props.color}; opacity: ${option};`"
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
      />
    </div>
  </div>
</template>
