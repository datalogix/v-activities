<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'
import type { FillInTheBlanksItem } from './Index.vue'

export type FillInTheBlanksItemProps = {
  item: FillInTheBlanksItem
  markerType: MarkerType
  position: number
}

const props = defineProps<FillInTheBlanksItemProps>()
const center = computed(() => props.item.content.trim().includes('\\<img'))
</script>

<template>
  <div
    class="activity-fill-in-the-blanks-item"
    px-8
    py-6
    lg:px-14
    lg:py-8
    w-full
    flex
    items-center
    gap-4
    flex-col
    md:flex-row
    border
    border-gray-300
    rounded
    scale-95
    transition
    duration-300
    hover:scale-100
    shadow-lg
    relative
    bg-white
    :class="{ '!flex-col': center }"
  >
    <Marker
      class="activity-fill-in-the-blanks-item-position"
      :type="markerType"
      :position="position"
    />
    <Media
      :content="item.file"
      :img-attrs="{ class: '!w-60 !h-40' }"
      :audio-attrs="{ class: '!w-60' }"
      :video-attrs="{ class: '!w-60' }"
    />
    <div
      class="activity-fill-in-the-blanks-item-content"
      flex-1
      flex
      items-center
      flex-wrap
      :class="{ 'justify-center': center }"
    >
      <slot :content="item.content" />
    </div>
  </div>
</template>
