<script setup lang="ts">
import Media from '../../components/Media.vue'
import type { MediaType } from '../../components/Media.vue'

export type MemoryGameItem = {
  key?: string
  value: MediaType
  related: MediaType
}

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

const emits = defineEmits<MemoryGameItemEmits>()
const activity = useActivity()
const opened = ref<boolean>(false)
const locked = ref<boolean>(false)
const media = ref<InstanceType<typeof Media>>()
const _timeout = ref<number>(props.timeout)

const open = (forcePlay = true) => {
  opened.value = true
  forcePlay && media.value?.play()
}

const close = () => {
  opened.value = false
  media.value?.stop()
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
      'rotate-y-180': activity.props.mode === 'preview' || opened,
      'activity-memory-game-item-opened': opened,
      'transition-duration-250ms': duration === 'faster',
      'transition-duration-500ms': duration === 'fast',
      'transition-duration-1s': duration === 'slow',
      'transition-duration-2s': duration === 'slower'
    }"
    mx-auto
    relative
    preserve-3d
    transition
    perspective="1000px"
    w-40
    h-40
    lg:w-48
    lg:h-48
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
      w-40
      h-40
      lg:w-48
      lg:h-48
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
        '!bg-blue-50 !border-blue-500 activity-memory-game-item-opened': opened,
        '!bg-green-50 !border-green-500 activity-memory-game-item-right': locked,
      }"
      border-2
      border-gray-300
      bg-white
      rounded
      backface-hidden
      absolute
      inset-0
      w-40
      h-40
      lg:w-48
      lg:h-48
      bg-center-center
      bg-no-repeat
      bg-contain
      flex
      justify-center
      items-center
      rotate-y-180
    >
      <div
        class="activity-memory-game-item-content"
        flex
        items-center
        justify-center
        w-full
        h-full
        p-2
        overflow-auto
      >
        <Media
          ref="media"
          :content="item.value"
          :audio-attrs="{ onLoadeddata: loadedMetadata }"
          :video-attrs="{ onLoadeddata: loadedMetadata }"
        />
      </div>
    </div>
  </div>
</template>
