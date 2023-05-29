<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

export type MediaType = File | URL | string

export type MediaProps = {
  content?: MediaType
  imgAttrs?: HTMLAttributes
  audioAttrs?: HTMLAttributes
  videoAttrs?: HTMLAttributes
}

const props = defineProps<MediaProps>()
const audio = ref<HTMLAudioElement>()
const video = ref<HTMLVideoElement>()
const player = computed(() => {
  if (audio.value) {
    return audio.value
  }

  if (video.value) {
    return video.value
  }
})

const file = computed(() => {
  if (props.content instanceof File) {
    return {
      name: props.content.name,
      ext: String(props.content.name.split('.').pop()),
      url: URL.createObjectURL(props.content)
    }
  }

  try {
    if (typeof props.content === 'string' || props.content instanceof URL) {
      const url = new URL(props.content)

      return {
        name: String(url.pathname.split('/').pop()),
        ext: String(url.pathname.split('.').pop()),
        url: url.href
      }
    }
  } catch { }

  return false
})

const play = () => {
  player.value?.play()
}

const stop = () => {
  if (player.value) {
    player.value.pause()
    player.value.currentTime = 0
  }
}

defineExpose({
  player,
  play,
  stop
})
</script>

<template>
  <div
    v-if="file && ['jpeg', 'jpg', 'gif', 'png', 'svg'].includes(file.ext)"
    ref="image"
    class="activity-media-image"
    bg-center-center
    bg-no-repeat
    bg-contain
    w-full
    h-full
    v-bind="imgAttrs"
    :style="{ 'background-image': `url('${file.url}')` }"
  />

  <audio
    v-else-if="file && ['mp3'].includes(file.ext)"
    ref="audio"
    class="activity-media-audio"
    controls
    v-bind="audioAttrs"
  >
    <source
      :src="file.url"
      type="audio/mpeg"
    >
  </audio>

  <video
    v-else-if="file && ['mp4'].includes(file.ext)"
    ref="video"
    class="activity-media-video"
    controls
    v-bind="videoAttrs"
  >
    <source
      :src="file.url"
      type="video/mp4"
    >
  </video>

  <slot
    v-else
    :content="content"
  />
</template>
