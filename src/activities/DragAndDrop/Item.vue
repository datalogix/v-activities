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
    py-4
    flex
    items-center
    space-x-4
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
    >
      <slot :content="item.content" />
    </div>
  </div>
</template>
