<script setup lang="ts">
import type { FillInTheBlanksItem } from './Index.vue'

export interface FillInTheBlanksItemProps {
  item: FillInTheBlanksItem
  position?: number
}

defineProps<FillInTheBlanksItemProps>()

const parseHTML = (html: string) => {
  return html
}
</script>

<template>
  <div
    class="activity-fill-in-the-blanks-item"
    py-4
    flex
    items-center
    space-x-4
  >
    <div
      v-if="position"
      class="activity-fill-in-the-blanks-item-position"
      text-sm
      md:text-base
      lg:text-lg
      font-bold
      text="#5F8FC1"
      v-text="position"
    />
    <div
      v-if="item.file"
      class="activity-fill-in-the-blanks-item-file"
    >
      <img
        class="activity-fill-in-the-blanks-item-image"
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
      class="activity-fill-in-the-blanks-item-html"
      flex-1
    >
      <slot :html="parseHTML(item.html)" />
    </div>
  </div>
</template>
