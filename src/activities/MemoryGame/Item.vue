<script setup lang="ts">
import type { MemoryGameItem } from './Index.vue'

export type MemoryGameItemProps = {
  item: MemoryGameItem
  timeout?: number
  duration?: 'slower' | 'slow' | 'fast' | 'faster'
}

export type MemoryGameItemEmits = {
  (e: 'select', item: MemoryGameItem): void
}

const props = withDefaults(defineProps<MemoryGameItemProps>(), {
  timeout: 1000,
  duration: 'fast'
})

const activity = useActivity()
const emits = defineEmits<MemoryGameItemEmits>()

const opened = ref<boolean>(false)
const locked = ref<boolean>(false)
const media = ref<HTMLMediaElement>()
const _timeout = ref<number>(props.timeout)

const file = computed(() => {
  if (props.item.value instanceof File) {
    return {
      name: props.item.value.name,
      ext: String(props.item.value.name.split('.').pop()),
      url: URL.createObjectURL(props.item.value)
    }
  }

  try {
    if (typeof props.item.value === 'string' || props.item.value instanceof URL) {
      const url = new URL(props.item.value)

      return {
        name: String(url.pathname.split('/').pop()),
        ext: String(url.pathname.split('.').pop()),
        url: url.href
      }
    }
  } catch { }

  return false
})

const open = (forcePlay = true) => {
  opened.value = true
  forcePlay && playMedia()
}

const close = () => {
  opened.value = false
  stopMedia()
}

const reset = () => {
  close()
  unlock()
}

const lock = () => {
  locked.value = true
}

const unlock = () => {
  locked.value = false
}

const playMedia = () => {
  if (!media.value) return

  media.value.play()
}

const stopMedia = () => {
  if (!media.value) return

  media.value.pause()
  media.value.currentTime = 0
}

const select = () => {
  if (locked.value || opened.value) {
    return
  }

  emits('select', props.item)
}

const loadedMetadata = (event: Event) => {
  if (!(event.target instanceof HTMLMediaElement)) return

  _timeout.value = Math.round(event.target.duration * 1000)
}

defineExpose({
  item: props.item,
  opened,
  locked,
  open,
  close,
  reset,
  lock,
  unlock,
  timeout: _timeout
})
</script>

<template>
  <div
    class="activity-memory-game-item"
    :class="{
      'rotate-y-180 activity-memory-game-item-opened': opened,
      'transition-duration-250ms': duration === 'faster',
      'transition-duration-500ms': duration === 'fast',
      'transition-duration-1s': duration === 'slow',
      'transition-duration-2s': duration === 'slower'
    }"
    mx-auto
    relative
    preserve-3d
    transition-all
    perspective="1000px"
    w-20
    h-20
    md:w-32
    md:h-32
    lg:w-40
    lg:h-40
    @click="select"
  >
    <div
      class="activity-memory-game-item-front"
      :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
      cursor-pointer
      rounded
      text-white
      text-3xl
      md:text-5xl
      lg:text-7xl
      font-bold
      backface-hidden
      absolute
      inset-0
      w-20
      h-20
      md:w-32
      md:h-32
      lg:w-40
      lg:h-40
      bg="#31393D"
      bg-center-center
      bg-no-repeat
      bg-contain
      flex
      justify-center
      items-center
      rotate-y-0
      z-2
      v-text="'?'"
    />
    <div
      class="activity-memory-game-item-back"
      :class="{
        'bg-blue-50 border-blue-300 activity-memory-game-item-opened': opened,
        'bg-green-50 border-green-300 activity-memory-game-item-right': locked,
      }"
      border-2
      border-solid
      rounded
      backface-hidden
      absolute
      inset-0
      w-20
      h-20
      md:w-32
      md:h-32
      lg:w-40
      lg:h-40
      bg-center-center
      bg-no-repeat
      bg-contain
      flex
      justify-center
      items-center
      rotate-y-180
    >
      <img
        v-if="file && ['jpeg', 'jpg', 'gif', 'png', 'svg'].includes(file.ext)"
        class="activity-memory-game-item-image"
        object-contain
        p-2
        w-20
        h-20
        md:w-32
        md:h-32
        lg:w-40
        lg:h-40
        :src="file.url"
      >

      <audio
        v-else-if="file && ['mp3'].includes(file.ext)"
        ref="media"
        class="activity-memory-game-item-audio"
        controls="false"
        w-full
        m-2
        @loadedmetadata="loadedMetadata"
      >
        <source
          :src="file.url"
          type="audio/mpeg"
        >
      </audio>

      <video
        v-else-if="file && ['mp4'].includes(file.ext)"
        ref="media"
        class="activity-memory-game-item-video"
        controls="false"
        w-full
        m-2
        @loadedmetadata="loadedMetadata"
      >
        <source
          :src="file.url"
          type="video/mp4"
        >
      </video>

      <div
        v-else
        class="activity-memory-game-item-html"
        text-lg
        font-semibold
        v-html="item.value"
      />
    </div>
  </div>
</template>
