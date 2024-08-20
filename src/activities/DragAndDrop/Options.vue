<script setup lang="ts">
import Draggable from './Draggable.vue'
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropOptionsProps = {
  options: DragAndDropOption[]
}

defineProps<DragAndDropOptionsProps>()
</script>

<template>
  <div
    tag="div"
    class="activity-drag-and-drop-options"
    flex
    flex-wrap
    items-center
    justify-center
    gap-2
    mx-auto
  >
    <Draggable
      v-for="option in options"
      :key="option.id"
      :option="option"
    />
  </div>
</template>
