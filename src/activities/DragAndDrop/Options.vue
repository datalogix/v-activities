<script setup lang="ts">
import Draggable from './Draggable.vue'
import type { DragAndDropOption } from './Parser.vue'

export type DragAndDropOptionsProps = {
  options: DragAndDropOption[]
}

defineProps<DragAndDropOptionsProps>()
</script>

<template>
  <transition-group
    tag="div"
    class="activity-drag-and-drop-options"
    flex
    flex-wrap
    items-center
    justify-center
    max-w-2xl
    mx-auto
  >
    <Draggable
      v-for="option in options"
      :key="option.id"
      :option="option"
    />
  </transition-group>
</template>
