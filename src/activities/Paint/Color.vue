<script setup lang="ts">
export type PaintColorProps = {
  alpha?: number
  colors?: string[]
}

export type PaintColorEmits = {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', openned: boolean): void
  (e: 'select', selected: string): void
}

withDefaults(defineProps<PaintColorProps>(), {
  alpha: 1,
  colors: () => [
    '#000000', // black
    '#ffffff', // white
    '#ed213a', // red
    '#ffe000', // yellow
    '#00b4db', // blue
    '#fe8c00', // orange
    '#52c234', // green
    '#f953c6', // pink
    '#d7d2cc', // grey
    '#a044ff', // purple
    '#ffd89f', // beige
    '#755d3f' // brown
  ]
})

const emits = defineEmits<PaintColorEmits>()

const selected = ref<string>('#000000')
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

const select = (color: string) => {
  close()
  selected.value = color
  emits('select', selected.value)
}

const start = () => {
  selected.value = '#000000'
}

defineExpose({
  selected,
  openned,
  open,
  close,
  toggle,
  start
})
</script>

<template>
  <div
    relative
    class="activity-paint-color"
  >
    <button
      :style="`background-color: ${selected}; opacity: ${alpha};`"
      class="activity-paint-color-selector"
      type="button"
      cursor-pointer
      mx-auto
      flex
      justify-center
      ring-4
      ring-gray-200
      items-center
      bg-white
      border
      border-solid
      border-gray-300
      rounded
      w-10
      h-10
      @click="toggle()"
    >
      <i
        :style="`color: ${!['#fff', '#ffffff'].includes(selected.toLocaleLowerCase()) ? '#fff' : '#000'};`"
        class="activity-paint-color-selector-icon"
        w-6
        h-6
        i-mdi-color
      />
    </button>
    <div
      v-show="openned"
      class="activity-paint-color-container"
      right--2
      mt-2
      right-0
      w-48
      absolute
      grid
      grid-cols-4
      gap-2
      bg-white
      rounded-xl
      shadow-xl
      p-2
    >
      <button
        v-for="color in colors"
        :key="color"
        :style="`background-color: ${color}`"
        class="activity-paint-color-item"
        type="button"
        cursor-pointer
        mx-auto
        flex
        justify-center
        items-center
        border
        border-solid
        border-gray-300
        rounded
        w-10
        h-10
        @click="select(color)"
      />
    </div>
  </div>
</template>
