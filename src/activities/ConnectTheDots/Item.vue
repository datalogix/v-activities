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
      class="activity-connect-the-dots-item-value"
      flex
      items-center
      justify-center
      w-full
      h-full
      p-2
    >
      <Media :content="item.value">
        <div
          class="activity-connect-the-dots-item-text"
          text-lg
          font-semibold
          overflow-hidden
          v-html="item.value"
        />
      </Media>
    </div>
  </div>
</template>
