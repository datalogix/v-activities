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
const dragging = ref(false)
const dropping = ref(false)

const onDragStart = (event: DragEvent) => {
  if (
    !event.dataTransfer ||
    !props.option?.selected?.id ||
    activity.props.mode === 'answered'
  ) {
    return
  }

  dragging.value = true
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id', props.option.selected.id)
}

const onDragOver = () => {
  dropping.value = true
}

const onDragLeave = () => {
  dropping.value = false
}

const onDrop = (event: DragEvent) => {
  const id = event.dataTransfer?.getData('id')

  if (id) {
    dragging.value = false
    dropping.value = false
    emits('drop', id, props.option)
  }
}

const enabled = computed(() => props.option?.selected !== undefined)
const content = computed(() => {
  if (props.option?.answer) {
    return props.option.answer
  }

  if (enabled.value) {
    return props.option?.selected?.value
  }

  if (activity.props.mode === 'preview') {
    return props.option?.value
  }

  return '&nbsp;'
})
</script>

<template>
  <div
    class="activity-drag-and-drop-droppable"
    :class="{
      'cursor-move activity-drag-and-drop-droppable-enabled': enabled,
      'px-14': activity.props.mode !== 'preview' && !enabled,
      '!cursor-not-allowed': activity.props.mode === 'answered',
      '!border-blue-500 !scale-100': dropping || props.option?.selected
    }"
    scale-95
    transition
    inline-block
    border-2
    border-gray-300
    border-dashed
    rounded
    m-1
    p-2
    md:py-3
    max-w-40
    :draggable="enabled && activity.props.mode !== 'answered'"
    @dragstart="onDragStart"
    @drop="onDrop"
    @dragleave.prevent="onDragLeave"
    @dragover.prevent="onDragOver"
  >
    <div
      :class="{ '!opacity-30': activity.props.mode === 'preview' && !enabled, }"
      v-html="content"
    />
  </div>
</template>
