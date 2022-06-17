<script setup lang="ts">
import Draggable from './Draggable.vue'
import type { DragAndDropContentOption } from './Content.vue'

export interface DragAndDropOptionsProps {
  options: DragAndDropContentOption[]
}

const props = defineProps<DragAndDropOptionsProps>()
</script>

<template>
  <transition-group
    tag="div"
    class="activity-drag-and-drop-options"
    border-gray-300
    py-10
    flex
    flex-wrap
    items-center
    justify-center
    max-w-2xl
    mx-auto
  >
    <Draggable
      v-for="(option, index) in props.options"
      :id="option.id"
      :key="index"
      :content="option.value"
    />
  </transition-group>
</template>
