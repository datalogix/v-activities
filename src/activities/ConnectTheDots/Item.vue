<script setup lang="ts">
import type { ConnectTheDotsItem } from './Index.vue'

export type ConnectTheDotsItemProps = {
  item: ConnectTheDotsItem
  type: 'left' | 'right'
}

export type ConnectTheDotsItemEmits = {
  (e: 'select', item: ConnectTheDotsItem): void
}

const props = defineProps<ConnectTheDotsItemProps>()
const emits = defineEmits<ConnectTheDotsItemEmits>()
const activity = useActivity()

const selected = ref<boolean>(false)

const clear = () => {
  selected.value = false
}

const select = () => {
  selected.value = true
}

defineExpose({
  item: props.item,
  clear,
  select,
  selected
})
</script>

<template>
  <div
    class="activity-connect-the-dots-item"
    :class="{
      'border-gray-300': !selected,
      'border-black activity-connect-the-dots-item-selected': selected,
      '!cursor-not-allowed': activity.props.mode === 'answered',
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
    @click="emits('select', item)"
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
      v-if="item.value.endsWith('.jpeg') || item.value.endsWith('.jpg') || item.value.endsWith('.png') || item.value.endsWith('.gif')"
      class="activity-connect-the-dots-item-image"
      :src="item.value"
    >

    <audio
      v-else-if="item.value.endsWith('.mp3')"
      class="activity-connect-the-dots-item-audio"
      controls
      w-full
      m-2
    >
      <source
        :src="item.value"
        type="audio/mpeg"
      >
    </audio>

    <video
      v-else-if="item.value.endsWith('.mp4')"
      class="activity-connect-the-dots-item-video"
      controls
      w-full
      m-2
    >
      <source
        :src="item.value"
        type="video/mp4"
      >
    </video>

    <div
      v-else
      class="activity-connect-the-dots-item-html"
      overflow-hidden
      v-html="item.value"
    />
  </div>
</template>
