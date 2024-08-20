<script setup lang="ts">
import Item, { type ConnectTheDotsItem } from './Item.vue'

export type ConnectTheDotsItemsProps = {
  items: ConnectTheDotsItem[]
  type: 'left' | 'right'
}

export type ConnectTheDotsItemsEmits = {
  (e: 'select', item: ConnectTheDotsItem): void
}

const props = defineProps<ConnectTheDotsItemsProps>()
const emits = defineEmits<ConnectTheDotsItemsEmits>()
const activity = useActivity()
const _items = ref(props.items)
const itemsRef = ref<InstanceType<typeof Item>[]>([])
const selected = ref<InstanceType<typeof Item>>()

const getKey = (item: ConnectTheDotsItem) => {
  return item.value instanceof File
    ? item.value.name
    : item.value.toString()
}

const find = (item: ConnectTheDotsItem) => {
  return itemsRef.value.find(i => compare(i.item.value, item.value))
}

const select = (item: ConnectTheDotsItem) => {
  if (activity.props.mode === 'answered') {
    return
  }

  if (selected.value) {
    selected.value.clear()
  }

  selected.value = find(item)
  selected.value?.select()

  emits('select', item)
}

const clear = () => {
  _items.value = shuffle(_items.value)

  if (selected.value) {
    selected.value.clear()
  }

  selected.value = undefined
}

const answered = (answer: ConnectTheDotsItem[]) => {
  _items.value = answer
}

defineExpose({
  answered,
  find,
  selected,
  items: _items,
  clear
})
</script>

<template>
  <TransitionGroup
    tag="div"
    class="activity-connect-the-dots-items"
    flex
    flex-col
    justify-center
    items-center
    gap-2
    w="1/3"
  >
    <Item
      v-for="item in _items"
      ref="itemsRef"
      :key="getKey(item)"
      :item="item"
      :type="type"
      :class="{
        'h-26': _items.length <= 4,
        'lg:h-40': _items.length <= 4,
        'lg:h-26': _items.length > 4
      }"
      @select="select(item)"
    />
  </TransitionGroup>
</template>
