<script setup lang="ts">
import type { MemorGameAnswer } from './Index.vue'
import Item, { type MemoryGameItem } from './Item.vue'

export type MemoryGameItemsProps = {
  items: MemoryGameItem[]
  timeout?: number
  duration?: 'slower' | 'slow' | 'fast' | 'faster'
}

export type MemoryGameItemsEmits = {
  (e: 'select', item: MemoryGameItem): void
  (e: 'right', item1: MemoryGameItem, item2: MemoryGameItem): void
  (e: 'wrong', item1: MemoryGameItem, item2: MemoryGameItem): void
}

const props = defineProps<MemoryGameItemsProps>()
const emits = defineEmits<MemoryGameItemsEmits>()
const activity = useActivity()
const itemsRef = ref<InstanceType<typeof Item>[]>([])
const item1 = ref<InstanceType<typeof Item>>()
const item2 = ref<InstanceType<typeof Item>>()
const _items = ref<MemoryGameItem[]>([
  ...props.items.map((item, index) => ({ key: `v${index}`, value: item.value, related: item.related })),
  ...props.items.map((item, index) => ({ key: `r${index}`, value: item.related, related: item.value }))
])

const find = (item: MemoryGameItem) => {
  return itemsRef.value.find(i => i.item.key === item.key)
}

const select = (item: MemoryGameItem) => {
  if ((item1.value && item2.value) || activity.props.mode === 'answered') {
    return
  }

  emits('select', item)

  if (!item1.value) {
    item1.value = find(item)
    item1.value?.open()
    return
  }

  if (!item2.value) {
    item2.value = find(item)
    item2.value?.open()
  }

  if (compare(item1.value?.item.value, item2.value?.item.related)) {
    return right()
  }

  return wrong()
}

const right = () => {
  item1.value?.lock()
  item2.value?.lock()

  emits(
    'right',
    item1.value!.item,
    item2.value!.item
  )

  item1.value = undefined
  item2.value = undefined
}

const wrong = () => {
  setTimeout(() => {
    item1.value?.close()
    item2.value?.close()

    if (item1.value && item2.value) {
      emits('wrong', item1.value!.item, item2.value!.item)
    }

    item1.value = undefined
    item2.value = undefined
  }, Math.max(item1.value!.timeout, item2.value!.timeout))
}

const start = () => {
  itemsRef.value.forEach(ref => ref.reset())
  item1.value = undefined
  item2.value = undefined
  _items.value = shuffle(_items.value)
}

const answered = (answer: MemorGameAnswer) => {
  _items.value = answer.items

  answer.selecteds.forEach(selected => {
    const item = find(selected)
    item?.open(false)

    if (answer.selecteds.filter(s => s !== selected).some(s => compare(selected.related, s.value))) {
      item?.lock()
    }
  })
}

defineExpose({
  items: _items,
  start,
  answered
})
</script>

<template>
  <div flex>
    <TransitionGroup
      tag="div"
      class="activity-memory-game-items"
      :class="{
        flex: _items.length % 3 !== 0 && _items.length % 4 !== 0,
        grid: _items.length % 3 === 0 || _items.length % 4 === 0,
        'flex-wrap': _items.length % 3 !== 0 && _items.length % 4 !== 0,
        'grid-cols-3': _items.length % 3 === 0,
        'grid-cols-2 lg:grid-cols-4': _items.length % 4 === 0
      }"
      mx-auto
      gap-2
    >
      <Item
        v-for="item in _items"
        ref="itemsRef"
        :key="item.key"
        :item="item"
        :timeout="timeout"
        :duration="duration"
        @select="select(item)"
      />
    </TransitionGroup>
  </div>
</template>
