<script setup lang="ts">
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropDraggableProps = {
  options: DragAndDropOption[]
  option: DragAndDropOption
}

const props = defineProps<DragAndDropDraggableProps>()
const activity = useActivity()
const dragging = ref(false)
const clone = ref<HTMLDivElement>()

const onDragStart = (event: DragEvent) => {
  if (!event.dataTransfer || activity.props.mode === 'answered') {
    return
  }

  dragging.value = true
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id', props.option.id)
}

const onDragEnd = () => {
  dragging.value = false
}

const center = (event: TouchEvent) => {
  if (!clone.value) return

  const touch = event.touches[0]
  clone.value.style.left = `${touch.clientX - clone.value.offsetWidth / 2}px`
  clone.value.style.top = `${touch.clientY - clone.value.offsetHeight / 2}px`

  props.options.forEach(dropzone => dropzone.ref?.checkOverLapping(clone.value!))
}

const onTouchStart = (event: TouchEvent) => {
  if (activity.props.mode === 'answered') {
    return
  }

  dragging.value = true
  clone.value = (event.currentTarget as HTMLDivElement).cloneNode(true) as HTMLDivElement
  clone.value.style.position = 'absolute'
  document.body.appendChild(clone.value)
  center(event)
}

const onTouchMove = (event: TouchEvent) => {
  if (!dragging.value || !clone.value) {
    return
  }

  center(event)
}

const onTouchEnd = () => {
  if (!dragging.value || !clone.value) {
    return
  }

  dragging.value = false

  props.options.forEach(dropzone => {
    dropzone.ref?.drop(props.option.id)
  })

  document.body.removeChild(clone.value)
  clone.value = undefined
}
</script>

<template>
  <div
    class="activity-drag-and-drop-draggable"
    :class="{
      '!cursor-not-allowed': activity.props.mode === 'answered',
      '!border-blue-500': dragging
    }"
    bg-white
    cursor-move
    border-2
    border-gray-300
    border-dashed
    rounded
    p-4
    scale-90
    transition
    duration-300
    hover:scale-100
    max-w-40
    shrink-0
    :draggable="activity.props.mode !== 'answered'"
    @contextmenu.prevent
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    v-html="option.value"
  />
</template>
