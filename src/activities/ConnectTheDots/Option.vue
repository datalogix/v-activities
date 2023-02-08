<script setup lang="ts">
import type { ConnectTheDotsOption } from './Index.vue'

export interface ConnectTheDotsOptionProps {
  option: ConnectTheDotsOption
  type: 'left' | 'right'
}

const props = defineProps<ConnectTheDotsOptionProps>()
const emits = defineEmits<{(e: 'select', option: ConnectTheDotsOption): void}>()

const selected = ref<boolean>(false)

const clear = () => {
  selected.value = false
}

const select = () => {
  selected.value = true
}

defineExpose({
  option: props.option,
  clear,
  select,
  selected
})
</script>

<template>
  <div
    class="activity-connect-the-dots-option"
    :class="{
      'border-gray-300': !selected,
      'border-black activity-connect-the-dots-option-selected': selected
    }"
    bg-white
    relative
    border
    border-solid
    cursor-pointer
    rounded
    w-20
    h-20
    md:w-32
    md:h-32
    lg:w-40
    lg:h-40
    flex
    justify-center
    items-center
    transition-all
    z-1
    @click="emits('select', option)"
  >
    <div
      class="activity-connect-the-dots-selector"
      absolute
      :class="{
        'left-0 activity-connect-the-dots-selector-right': type === 'right',
        'right-0 activity-connect-the-dots-selector-left': type === 'left',
        'border-gray-300 bg-white': !selected,
        'border-black bg-black activity-connect-the-dots-selector-selected': selected
      }"
      :ml="type === 'right' ? -3 : 0"
      :mr="type === 'left' ? -3 : 0"
      border
      border-solid
      w-4
      h-4
      rounded-full
      flex
      items-center
      justify-center
    />

    <img
      v-if="option.value.endsWith('.jpeg') || option.value.endsWith('.jpg') || option.value.endsWith('.png') || option.value.endsWith('.gif')"
      class="activity-connect-the-dots-option-image"
      :src="option.value"
    >

    <audio
      v-else-if="option.value.endsWith('.mp3')"
      class="activity-connect-the-dots-option-audio"
      controls
      w-full
      m-2
    >
      <source
        :src="option.value"
        type="audio/mpeg"
      >
    </audio>

    <video
      v-else-if="option.value.endsWith('.mp4')"
      class="activity-connect-the-dots-option-video"
      controls
      w-full
      m-2
    >
      <source
        :src="option.value"
        type="video/mp4"
      >
    </video>

    <div
      v-else
      class="activity-connect-the-dots-option-html"
      overflow-hidden
      v-html="option.value"
    />
  </div>
</template>
