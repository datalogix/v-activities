<script setup lang="ts">
import Activity from '../Activity.vue'
import Grid, { type WordSearchGridPosition } from './Grid.vue'
import List from './List.vue'

export type WordSearchItem = {
  word: string
  diagonal?: boolean
  invert?: boolean
  media?: string
}

export type WordSearchAnswer = {
  /** @deprecated */
  usedWords?: string[]
  /** @deprecated */
  foundWords?: string[]

  usedItems: WordSearchItem[]
  foundItems: WordSearchItem[]
  letterGrid: string[][]
  gridWord: string[][]
  foundTiles: WordSearchGridPosition[]
}

export type WordSearchProps = {
  items: (WordSearchItem | string)[]
  size?: number
  position?: 'statement' | 'top' | 'bottom' | 'all' | 'none'
  shuffle?: boolean
}

const props = withDefaults(defineProps<WordSearchProps>(), {
  size: 8,
  position: 'statement',
  shuffle: true
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<WordSearchAnswer>()
const grid = ref<InstanceType<typeof Grid>>()

const start = () => {
  grid.value?.build()

  answer.value = {
    usedItems: grid.value!.usedItems,
    foundItems: grid.value!.foundItems,
    letterGrid: grid.value!.letterGrid,
    gridWord: grid.value!.gridWord,
    foundTiles: grid.value!.foundTiles
  }
}

const answered = (_answer: WordSearchAnswer) => {
  return grid.value?.answered(_answer)
}

const check = () => {
  const percentage = grid.value!.foundItems.length
    ? (grid.value!.foundItems.length * 100 / grid.value!.usedItems.length)
    : 0

  const result = {
    right: grid.value!.foundItems.length,
    total: grid.value!.usedItems.length
  }

  return activity.value?.store({
    percentage,
    result
  })
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="word-search"
    :options="props"
    @start="start"
    @answered="answered"
    @check="check"
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

    <template
      v-if="position === 'statement' || position === 'all'"
      #activity-statement
    >
      <List
        :items="grid?.usedItems || []"
        :selected="grid?.foundItems || []"
      />
    </template>

    <List
      v-if="position === 'top' || position === 'all'"
      :items="grid?.usedItems || []"
      :selected="grid?.foundItems || []"
      mb-4
    />

    <Grid
      ref="grid"
      :size="size"
      :items="items"
      :shuffle="shuffle"
      @right="activity?.filled()"
      @wrong="activity?.filled()"
      @complete="check"
    />

    <List
      v-if="position === 'bottom' || position === 'all'"
      :items="grid?.usedItems || []"
      :selected="grid?.foundItems || []"
      mt-4
    />
  </Activity>
</template>
