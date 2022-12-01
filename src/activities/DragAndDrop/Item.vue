<script setup lang="ts">
import type { DragAndDropItem } from './Index.vue'

export interface DragAndDropItemProps {
  item: DragAndDropItem
  position?: number
}

defineProps<DragAndDropItemProps>()

const parseHTML = (html: string) => {
  if (html.endsWith('.jpg') || html.endsWith('.jpeg') || html.endsWith('.gif') || html.endsWith('.png')) {
    return `[<img w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 src="${html}" />]`
  }

  return html
}
</script>

<template>
  <div
    class="activity-drag-and-drop-item"
    py-4
    flex
    items-center
    space-x-4
  >
    <div
      v-if="position"
      class="activity-drag-and-drop-item-position"
      text-sm
      md:text-base
      lg:text-lg
      font-bold
      text="#5F8FC1"
      v-text="position"
    />
    <div
      v-if="item.file"
      class="activity-drag-and-drop-item-file"
    >
      <img
        class="activity-drag-and-drop-item-image"
        w-32
        h-32
        md:w-40
        md:h-40
        lg:w-60
        lg:h-60
        :src="item.file"
      >
    </div>
    <div
      class="activity-drag-and-drop-item-html"
      flex-1
    >
      <slot :html="parseHTML(item.html)" />
    </div>
  </div>
</template>
