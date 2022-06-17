<script setup lang="ts">
export interface DragAndDropDroppableProps {
  id?: string
  enabled?: boolean
  content: string
}

const props = defineProps<DragAndDropDroppableProps>()
const emits = defineEmits<{(e: 'drop', optionID: string): void}>()

const startDrag = (event: DragEvent) => {
  if (!event.dataTransfer || !props.id) return

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('optionID', props.id)
}

const onDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return

  const optionID = event.dataTransfer.getData('optionID')

  if (!optionID) return

  emits('drop', optionID)
}
</script>

<template>
  <div
    class="activity-drag-and-drop-droppable"
    :class="{ 'cursor-move activity-drag-and-drop-droppable-enabled': props.enabled }"
    inline-block
    border
    border-gray-300
    bg-gray-100
    rounded
    m-1
    py-2
    px-10
    :draggable="props.enabled"
    @dragstart="startDrag"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent
    v-html="props.content"
  />
</template>
