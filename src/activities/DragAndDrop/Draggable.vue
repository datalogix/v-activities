<script setup lang="ts">
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropDraggableProps = {
  option: DragAndDropOption
}

const props = defineProps<DragAndDropDraggableProps>()
const activity = useActivity()
const dragging = ref(false)

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
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    v-html="option.value"
  />
</template>
