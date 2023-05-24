<script setup lang="ts">
import Activity from '../Activity.vue'
import Items from './Items.vue'

export type MemoryGameItem = {
  value: string
  related: string
}

export type MemorGameAnswer = {
  items: MemoryGameItem[]
  selecteds: MemoryGameItem[]
  right: MemoryGameItem[]
  wrong: MemoryGameItem[]
}

export type MemoryGameProps = {
  items: MemoryGameItem[]
  timeout?: number
  duration?: 'slower' | 'slow' | 'fast' | 'faster'
}

const props = defineProps<MemoryGameProps>()
const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<MemorGameAnswer>()
const items = ref<InstanceType<typeof Items>>()

const select = (item: MemoryGameItem) => {
  activity.value?.filled()
  answer.value?.selecteds.push(item)
}

const right = (item1: MemoryGameItem, item2: MemoryGameItem) => {
  answer.value?.right.push(item1, item2)

  if (answer.value?.right.length === items.value?.items.length) {
    activity.value?.store({ percentage: 100, result: true })
  }
}

const wrong = (item1: MemoryGameItem, item2: MemoryGameItem) => {
  answer.value?.selecteds.splice(answer.value?.selecteds.findIndex((s) => s === item1), 1)
  answer.value?.selecteds.splice(answer.value?.selecteds.findIndex((s) => s === item2), 1)
  answer.value?.wrong.push(item1, item2)
}

const start = () => {
  items.value?.start()

  answer.value = {
    items: items.value!.items,
    selecteds: [],
    right: [],
    wrong: []
  }
}

const answered = (_answer: MemorGameAnswer) => {
  return items.value?.answered(_answer)
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="memory-game"
    :options="props"
    :can-check="false"
    @start="start"
    @answered="answered"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <Items
      ref="items"
      :items="props.items"
      :timeout="timeout"
      :duration="duration"
      @select="select"
      @right="right"
      @wrong="wrong"
    />
  </Activity>
</template>
