<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'
import type { FillInTheBlanksItem } from './Index.vue'

export type FillInTheBlanksItemProps = {
  item: FillInTheBlanksItem
  markerType: MarkerType
  position: number
}

defineProps<FillInTheBlanksItemProps>()
</script>

<template>
  <div
    class="activity-fill-in-the-blanks-item"
    py-4
    flex
    items-center
    space-x-4
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
    >
      <slot :content="item.content" />
    </div>
  </div>
</template>
