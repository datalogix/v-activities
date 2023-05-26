<script setup lang="ts">
import type { FillInTheBlanksItem, FillInTheBlanksMarker } from './Index.vue'

export type FillInTheBlanksItemProps = {
  item: FillInTheBlanksItem
  markerType: FillInTheBlanksMarker
  position: number
}

const props = defineProps<FillInTheBlanksItemProps>()

const markerText = computed(() => {
  if (props.markerType === 'none') {
    return false
  }

  if (props.markerType === 'letter') {
    return `${LETTERS[props.position].toLocaleLowerCase()}.`
  }

  if (props.markerType === 'letter_uppercase') {
    return `${LETTERS[props.position].toLocaleUpperCase()}.`
  }

  return `${props.position + 1}.`
})

const file = computed(() => {
  if (props.item.file instanceof File) {
    return {
      name: props.item.file.name,
      ext: String(props.item.file.name.split('.').pop()),
      url: URL.createObjectURL(props.item.file)
    }
  }

  try {
    if (typeof props.item.file === 'string' || props.item.file instanceof URL) {
      const url = new URL(props.item.file)

      return {
        name: String(url.pathname.split('/').pop()),
        ext: String(url.pathname.split('.').pop()),
        url: url.href
      }
    }
  } catch { }

  return false
})

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
      v-if="markerText"
      class="activity-fill-in-the-blanks-item-position"
      text-sm
      md:text-base
      lg:text-lg
      font-semibold
      v-text="markerText"
    />
    <div
      v-if="file"
      flex
      items-center
      justify-center
      w-60
      p-2
    >
      <div
        v-if="['jpeg', 'jpg', 'gif', 'png', 'svg'].includes(file.ext)"
        class="activity-fill-in-the-blanks-item-image"
        bg-center-center
        bg-no-repeat
        bg-contain
        w-full
        h-40
        :style="{
          'background-image': `url('${file.url}')`,
        }"
      />

      <audio
        v-else-if="['mp3'].includes(file.ext)"
        class="activity-fill-in-the-blanks-item-audio"
        controls
      >
        <source
          :src="file.url"
          type="audio/mpeg"
        >
      </audio>

      <video
        v-else-if="['mp4'].includes(file.ext)"
        class="activity-fill-in-the-blanks-item-video"
        controls
      >
        <source
          :src="file.url"
          type="video/mp4"
        >
      </video>
    </div>
    <div
      class="activity-fill-in-the-blanks-item-content"
      flex-1
    >
      <slot :content="item.content" />
    </div>
  </div>
</template>
