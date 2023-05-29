<script setup lang="ts">
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropDroppableProps = {
  option: DragAndDropOption
}

export type DragAndDropDroppableEmits = {
  (e: 'drop', id: string, option: DragAndDropOption): void
}

const props = defineProps<DragAndDropDroppableProps>()
const emits = defineEmits<DragAndDropDroppableEmits>()
const activity = useActivity()

const onDrag = (event: DragEvent) => {
  if (
    !event.dataTransfer ||
    !props.option.selected?.id ||
    activity.props.mode === 'answered'
  ) {
    return
  }

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id', props.option.selected.id)
}

const onDrop = (event: DragEvent) => {
  const id = event.dataTransfer?.getData('id')

  if (id) {
    emits('drop', id, props.option)
  }
}

const enabled = computed(() => props.option?.selected !== undefined)
const content = computed(() => {
  if (props.option.answer) {
    return props.option.answer
  }

  if (enabled.value) {
    return props.option.selected?.value
  }

  if (activity.props.mode === 'preview') {
    return props.option.value
  }

  return '&nbsp;'
})
</script>

<template>
  <div
    class="activity-drag-and-drop-droppable"
    :class="{
      'cursor-move activity-drag-and-drop-droppable-enabled': enabled,
      'px-14': !enabled,
      '!cursor-not-allowed': activity.props.mode === 'answered'
    }"
    inline-block
    border
    border-solid
    border-gray-300
    bg-gray-50
    rounded
    m-1
    p-2
    :draggable="enabled && activity.props.mode !== 'answered'"
    @dragstart="onDrag"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      :class="{ '!opacity-30': activity.props.mode === 'preview' && !enabled, }"
      v-html="content"
    />
  </div>
</template>
