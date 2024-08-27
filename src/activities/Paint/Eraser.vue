<script setup lang="ts">
export type PaintEraserProps = {
  erasers?: number[]
}

export type PaintEraserEmits = {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'toggle', opened: boolean): void
  (e: 'select', selected: number): void
  (e: 'enable'): void
  (e: 'disable'): void
}

withDefaults(defineProps<PaintEraserProps>(), {
  erasers: () => [
    4,
    6,
    8,
    10,
    12
  ]
})

const emits = defineEmits<PaintEraserEmits>()

const selected = ref<number>(8)
const opened = ref<boolean>(false)
const active = ref<boolean>(false)

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

const select = (eraser: number) => {
  close()
  selected.value = eraser
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
  opened,
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
      v-show="opened"
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
        v-for="eraser in erasers"
        :key="eraser"
        class="activity-paint-eraser-item"
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
        @click="select(eraser)"
      >
        <i
          class="activity-paint-eraser-item-icon"
          :style="`width: ${eraser * 2}px; height: ${eraser * 2}px;`"
          i-mdi-eraser
        />
      </button>
    </div>
  </div>
</template>
