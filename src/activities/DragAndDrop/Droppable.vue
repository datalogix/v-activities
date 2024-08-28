<script setup lang="ts">
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropDroppableProps = {
  options: DragAndDropOption[]
  option: DragAndDropOption
}

const props = defineProps<DragAndDropDroppableProps>()
const activity = useActivity()
const dropzone = ref<HTMLDivElement>()
const dragging = ref(false)
const dropping = ref(false)
const clone = ref<HTMLDivElement>()

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

  if (!id) {
    return
  }

  drop(id)
}

const center = (event: TouchEvent) => {
  if (!clone.value) return

  const touch = event.touches[0]
  clone.value.style.left = `${touch.clientX - clone.value.offsetWidth / 2}px`
  clone.value.style.top = `${touch.clientY - clone.value.offsetHeight / 2}px`
  props.options.forEach(dropzone => dropzone.ref?.checkOverLapping(clone.value!))
}

const onTouchStart = (event: TouchEvent) => {
  if (
    !props.option?.selected?.id ||
    activity.props.mode === 'answered'
  ) {
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
    dropzone.ref?.drop(props.option.selected?.id)
  })

  document.body.removeChild(clone.value)
  clone.value = undefined
}

const checkOverLapping = (element: HTMLElement) => {
  const rectA = element.getBoundingClientRect()
  const rectB = dropzone.value!.getBoundingClientRect()
  const xOverlap = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left))
  const yOverlap = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top))
  const overlapArea = xOverlap * yOverlap
  const areaA = rectA.width * rectA.height
  const areaB = rectB.width * rectB.height
  const minArea = Math.min(areaA, areaB)

  dropping.value = (overlapArea >= minArea * 0.3)

  return dropping.value
}

const drop = (id?: string) => {
  if (!dropping.value) return

  dragging.value = false
  dropping.value = false

  const optionRelated = props.options.find(o => o.id === id)

  if (!optionRelated) {
    return
  }

  const option = props.option

  props.options.forEach(i => {
    if (i.selected === optionRelated) {
      i.selected.related = undefined
      i.selected = undefined
    }
  })

  if (option.selected) {
    option.selected.related = undefined
  }

  option.selected = optionRelated
  optionRelated.related = option
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

defineExpose({
  checkOverLapping,
  drop
})
</script>

<template>
  <div
    ref="dropzone"
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
    @contextmenu.prevent
    @dragstart="onDragStart"
    @dragleave.prevent="onDragLeave"
    @dragover.prevent="onDragOver"
    @drop.prevent="onDrop"
    @touchstart.prevent="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend.prevent="onTouchEnd"
  >
    <div
      :class="{ '!opacity-30': activity.props.mode === 'preview' && !enabled, }"
      v-html="content"
    />
  </div>
</template>
