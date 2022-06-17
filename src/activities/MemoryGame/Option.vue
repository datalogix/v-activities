<script setup lang="ts">
import { ref } from 'vue'
import type { MemoryGameOption } from './Index.vue'

export interface MemoryGameOptionProps {
  option: MemoryGameOption
  timeout?: number
  duration?: 'slower' | 'slow' | 'fast' | 'faster'
}

const props = withDefaults(defineProps<MemoryGameOptionProps>(), {
  timeout: 2000,
  duration: 'fast'
})

const emits = defineEmits<{(e: 'select', option: MemoryGameOption): void}>()

const opened = ref<boolean>(false)
const locked = ref<boolean>(false)
const media = ref<HTMLMediaElement>()
const timeout = ref<number>(props.timeout)

const open = () => {
  opened.value = true
  playMedia()
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

  emits('select', props.option)
}

const onLoadedMetadata = (event: Event) => {
  if (!(event.target instanceof HTMLMediaElement)) return
  timeout.value = Math.round(event.target.duration * 1000)
}

defineExpose({
  option: props.option,
  opened,
  locked,
  open,
  close,
  reset,
  lock,
  unlock,
  timeout
})
</script>

<template>
  <div
    class="activity-memory-game-option"
    :class="{
      'rotate-y-180 activity-memory-game-option-opened': opened,
      'transition-duration-250ms': props.duration === 'faster',
      'transition-duration-500ms': props.duration === 'fast',
      'transition-duration-1s': props.duration === 'slow',
      'transition-duration-2s': props.duration === 'slower'
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
      class="activity-memory-game-option-front"
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
      cursor-pointer
      rotate-y-0
      z-2
    >
      ?
    </div>
    <div
      class="activity-memory-game-option-back"
      :class="{
        'bg-blue-100 border-blue-400 activity-memory-game-option-opened': opened,
        'bg-green-100 border-green-400 activity-memory-game-option-right': locked,
      }"
      border-2
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
        v-if="props.option.value.endsWith('.jpeg') || props.option.value.endsWith('.jpg') || props.option.value.endsWith('.png') || props.option.value.endsWith('.gif')"
        class="activity-memory-game-option-image"
        :src="props.option.value"
      >
      <audio
        v-else-if="props.option.value.endsWith('.mp3')"
        ref="media"
        class="activity-memory-game-option-audio"
        controls
        w-full
        m-2
        @loadedmetadata="onLoadedMetadata"
      >
        <source
          :src="props.option.value"
          type="audio/mpeg"
        >
      </audio>
      <video
        v-else-if="props.option.value.endsWith('.mp4')"
        ref="media"
        class="activity-memory-game-option-video"
        controls
        w-full
        m-2
        @loadedmetadata="onLoadedMetadata"
      >
        <source
          :src="props.option.value"
          type="video/mp4"
        >
      </video>
      <div
        v-else
        class="activity-memory-game-option-html"
        v-html="props.option.value"
      />
    </div>
  </div>
</template>
