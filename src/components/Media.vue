<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

export type MediaType = File | URL | string

export type MediaProps = {
  content?: MediaType
  textAttrs?: HTMLAttributes
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

  return null
})

const file = computed(() => {
  const validExtensions = ['jpeg', 'jpg', 'gif', 'png', 'svg', 'mp3', 'mp4']
  let ext
  let url

  if (props.content instanceof File) {
    ext = String(props.content.name.split('.').pop())
    url = URL.createObjectURL(props.content)
  } else if (props.content instanceof URL) {
    ext = String(props.content.pathname.split('.').pop())
    url = props.content.href
  } else {
    ext = String(props.content?.split('.').pop())
    url = props.content
  }

  if (!validExtensions.includes(ext)) {
    return false
  }

  return { ext, url }
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
  >
    <div
      v-if="content"
      v-bind="textAttrs"
      text-sm
      :class="{
        'md:text-base': String(content).length > 100 && String(content).length < 120,
        'md:text-lg': String(content).length <= 100,
      }"
      font-semibold
      v-html="content"
    />
  </slot>
</template>
