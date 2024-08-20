<script setup lang="ts">
import type { MediaType } from '../../components/Media.vue'

export type ConnectTheDotsItem = {
  value: MediaType
  related: MediaType
}

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
const connected = ref<boolean>(false)

const clear = () => {
  selected.value = false
  connected.value = false
}

const select = () => {
  connected.value = false
  selected.value = true
}

const connect = () => {
  connected.value = true
}

defineExpose({
  item: props.item,
  clear,
  select,
  selected,
  connect
})
</script>

<template>
  <div
    class="activity-connect-the-dots-item"
    :class="{
      'border-gray-300': !selected,
      'border-blue-500 !scale-100 activity-connect-the-dots-item-selected': selected,
      'border-solid activity-connect-the-dots-item-connected': connected,
      '!cursor-not-allowed': activity.props.mode === 'answered',

    }"
    scale-95
    transition
    duration-300
    hover:scale-100
    bg-white
    relative
    w-full
    h-20
    border-2
    border-dashed
    cursor-pointer
    rounded
    flex
    justify-center
    items-center
    z-1
    @click="emits('select', item)"
  >
    <div
      class="activity-connect-the-dots-selector"
      absolute
      :class="{
        'left-0 activity-connect-the-dots-selector-right': type === 'right',
        'right-0 activity-connect-the-dots-selector-left': type === 'left',
        'border-gray-500 bg-white': !selected,
        'border-blue-500 bg-blue-500 activity-connect-the-dots-selector-selected': selected,
      }"
      :ml="type === 'right' ? -3 : 0"
      :mr="type === 'left' ? -3 : 0"
      border
      w-4
      h-4
      rounded-full
      flex
      items-center
      justify-center
    />
    <div
      class="activity-connect-the-dots-item-value"
      flex
      items-center
      justify-center
      w-full
      h-full
      p-2
      overflow-auto
    >
      <Media :content="item.value" />
    </div>
  </div>
</template>
