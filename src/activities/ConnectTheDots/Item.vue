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

    <div
      v-if="file && ['jpeg', 'jpg', 'gif', 'png', 'svg'].includes(file.ext)"
      class="activity-connect-the-dots-item-image"
      bg-center-center
      bg-no-repeat
      bg-contain
      :style="{
        'background-image': `url('${file.url}')`,
        'width': '90%',
        'height': '90%'
      }"
    />

    <audio
      v-else-if="file && ['mp3'].includes(file.ext)"
      class="activity-connect-the-dots-item-audio"
      controls
      w-full
      m-2
    >
      <source
        :src="file.url"
        type="audio/mpeg"
      >
    </audio>

    <video
      v-else-if="file && ['mp4'].includes(file.ext)"
      class="activity-connect-the-dots-item-video"
      controls
      w-full
      m-2
    >
      <source
        :src="file.url"
        type="video/mp4"
      >
    </video>

    <div
      v-else
      class="activity-connect-the-dots-item-html"
      text-lg
      font-semibold
      overflow-hidden
      v-html="item.value"
    />
  </div>
</template>
