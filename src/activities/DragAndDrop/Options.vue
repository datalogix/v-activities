<script setup lang="ts">
import Draggable from './Draggable.vue'
import type { DragAndDropOption } from './Index.vue'

export interface DragAndDropOptionsProps {
  options: DragAndDropOption[]
}

defineProps<DragAndDropOptionsProps>()
</script>

<template>
  <transition-group
    tag="div"
    class="activity-drag-and-drop-options"
    border-gray-300
    flex
    flex-wrap
    items-center
    justify-center
    max-w-2xl
    mx-auto
  >
    <Draggable
      v-for="(option, index) in options"
      :id="option.id"
      :key="index"
      :content="option.value"
    />
  </transition-group>
</template>
