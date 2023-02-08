<script setup lang="ts">
export interface DragAndDropDraggableProps {
  id: string
  content: string
}

const props = defineProps<DragAndDropDraggableProps>()

const startDrag = (event: DragEvent) => {
  if (!event.dataTransfer) return

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('optionID', props.id)
}
</script>

<template>
  <div
    class="activity-drag-and-drop-draggable"
    cursor-move
    border
    border-solid
    border-gray-300
    bg-gray-50
    rounded
    m-2
    p-2
    transition-all
    draggable="true"
    @dragstart="startDrag"
    v-html="props.content"
  />
</template>
