<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'
import type { MediaType } from '../../components/Media.vue'

export type DragAndDropItem = {
  content: string
  file?: MediaType
}

export type DragAndDropItemProps = {
  item: DragAndDropItem
  markerType: MarkerType
  position: number
}

defineProps<DragAndDropItemProps>()
</script>

<template>
  <div
    class="activity-drag-and-drop-item"
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
    shadow-lg
    relative
    bg-white
    transition
  >
    <Marker
      class="activity-drag-and-drop-item-position"
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
      class="activity-drag-and-drop-item-content"
      flex-1
      flex
      items-center
      flex-wrap
    >
      <slot :content="item.content" />
    </div>
  </div>
</template>
