<script setup lang="ts">
import type { ConnectTheDotsItem } from './Index.vue'
import Item from './Item.vue'

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

const select = (item: ConnectTheDotsItem) => {
  if (activity.props.mode === 'answered') {
    return
  }

  if (selected.value) {
    selected.value.clear()
  }

  selected.value = itemsRef.value.find(i => i.item.value === item.value)
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

const find = (item: ConnectTheDotsItem) => {
  return itemsRef.value.find(i => i.item.value === item.value)
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
  <transition-group
    tag="div"
    class="activity-connect-the-dots-items"
    flex
    flex-col
    justify-center
    items-center
    gap-2
  >
    <Item
      v-for="item in _items"
      ref="itemsRef"
      :key="item.value"
      :item="item"
      :type="type"
      @select="select(item)"
    />
  </transition-group>
</template>
