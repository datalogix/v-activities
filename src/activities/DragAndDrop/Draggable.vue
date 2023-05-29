<script setup lang="ts">
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropDraggableProps = {
  option: DragAndDropOption
}

const props = defineProps<DragAndDropDraggableProps>()
const activity = useActivity()

const onDrag = (event: DragEvent) => {
  if (!event.dataTransfer || activity.props.mode === 'answered') {
    return
  }

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id', props.option.id)
}
</script>

<template>
  <div
    class="activity-drag-and-drop-draggable"
    :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
    cursor-move
    border
    border-solid
    border-gray-300
    bg-gray-50
    rounded
    m-2
    p-2
    transition-all
    :draggable="activity.props.mode !== 'answered'"
    @dragstart="onDrag"
    v-html="option.value"
  />
</template>
