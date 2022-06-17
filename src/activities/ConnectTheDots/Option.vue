<script setup lang="ts">
import { ref } from 'vue'
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
    relative
    border
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
    @click="emits('select', props.option)"
  >
    <div
      class="activity-connect-the-dots-selector"
      absolute
      :class="{
        'left-0 activity-connect-the-dots-selector-right': props.type === 'right',
        'right-0 activity-connect-the-dots-selector-left': props.type === 'left',
        'border-gray-300 bg-white': !selected,
        'border-black bg-black activity-connect-the-dots-selector-selected': selected
      }"
      :ml="props.type === 'right' ? -3 : 0"
      :mr="props.type === 'left' ? -3 : 0"
      border
      w-4
      h-4
      rounded-full
      flex
      items-center
      justify-center
    />

    <img
      v-if="props.option.value.endsWith('.jpeg') || props.option.value.endsWith('.jpg') || props.option.value.endsWith('.png') || props.option.value.endsWith('.gif')"
      class="activity-connect-the-dots-option-image"
      :src="props.option.value"
    >

    <audio
      v-else-if="props.option.value.endsWith('.mp3')"
      class="activity-connect-the-dots-option-audio"
      controls
      w-full
      m-2
    >
      <source
        :src="props.option.value"
        type="audio/mpeg"
      >
    </audio>

    <video
      v-else-if="props.option.value.endsWith('.mp4')"
      class="activity-connect-the-dots-option-video"
      controls
      w-full
      m-2
    >
      <source
        :src="props.option.value"
        type="video/mp4"
      >
    </video>

    <div
      v-else
      class="activity-connect-the-dots-option-html"
      v-html="props.option.value"
    />
  </div>
</template>
