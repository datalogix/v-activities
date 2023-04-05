<script setup lang="ts">
export interface PaintEraserProps {
  options?: number[]
}

export type PaintEraserEmits = {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', openned: boolean): void
  (e: 'select', selected: number): void
  (e: 'enable'): void
  (e: 'disable'): void
}

withDefaults(defineProps<PaintEraserProps>(), {
  options: () => [
    4,
    6,
    8,
    10,
    12
  ]
})

const emits = defineEmits<PaintEraserEmits>()

const selected = ref<number>(8)
const openned = ref<boolean>(false)
const active = ref<boolean>(false)

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

const enable = () => {
  active.value = true
  emits('enable')
}

const disable = () => {
  active.value = false
  emits('disable')
}

const start = () => {
  active.value = false
  selected.value = 8
}

defineExpose({
  selected,
  openned,
  active,
  open,
  close,
  toggle,
  enable,
  disable,
  start
})
</script>

<template>
  <div
    class="activity-paint-eraser"
    relative
  >
    <button
      class="activity-paint-eraser-selector"
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
      <i
        class="activity-paint-eraser-selector-icon"
        :style="`width: ${selected * 2}px; height: ${selected * 2}px;`"
        w-6
        h-6
        i-mdi-eraser
      />
    </button>
    <div
      v-show="openned"
      class="activity-paint-eraser-container"
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
        class="activity-paint-eraser-option"
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
        @click="select(option)"
      >
        <i
          class="activity-paint-eraser-option-icon"
          :style="`width: ${option * 2}px; height: ${option * 2}px;`"
          i-mdi-eraser
        />
      </button>
    </div>
  </div>
</template>
