<script setup lang="ts">
import Activity from '../Activity.vue'
import Grid from './Grid.vue'
import WordList from './WordList.vue'
import type { WordSearchGridPosition } from './Grid.vue'

export type WordSearchWord = {
  word: string
  diagonal?: boolean
  invert?: boolean
}

export type WordSearchAnswer = {
  usedWords: string[]
  foundWords: string[]
  letterGrid: string[][]
  gridWord: string[][]
  foundTiles: WordSearchGridPosition[]
}

export interface WordSearchProps {
  words: (WordSearchWord | string)[]
  size?: number
  position?: 'top' | 'bottom' | 'both'
  shuffle?: boolean
}

const props = withDefaults(defineProps<WordSearchProps>(), {
  size: 8,
  position: 'top',
  shuffle: true
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<WordSearchAnswer>()
const grid = ref<InstanceType<typeof Grid>>()
const words = props.words.map((word) => {
  if (typeof word === 'string') {
    return {
      word,
      diagonal: false,
      invert: false
    } as WordSearchWord
  }

  return word
})

const onFill = () => {
  answer.value = grid.value
    ? {
        usedWords: grid.value.usedWords,
        foundWords: grid.value.foundWords,
        letterGrid: grid.value.letterGrid,
        gridWord: grid.value.gridWord,
        foundTiles: grid.value.foundTiles
      }
    : undefined
}

const start = () => {
  return grid.value?.build()
}

const answered = (_answer: unknown) => {
  return grid.value?.answered(_answer as WordSearchAnswer)
}

const check = () => {
  if (!grid.value) {
    return null
  }

  const percentage = grid.value.foundWords.length
    ? (grid.value.foundWords.length * 100 / grid.value.usedWords.length)
    : 0

  const result = {
    right: grid.value.foundWords.length,
    total: grid.value.usedWords.length
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

    <WordList
      v-if="position === 'top' || position === 'both'"
      :words="grid?.usedWords || []"
      :selected="grid?.foundWords || []"
      mb-4
    />

    <Grid
      ref="grid"
      :size="size"
      :words="words"
      :shuffle="shuffle"
      @right="onFill"
      @wrong="onFill"
      @complete="check"
    />

    <WordList
      v-if="position === 'bottom' || position === 'both'"
      :words="grid?.usedWords || []"
      :selected="grid?.foundWords || []"
      mt-4
    />
  </Activity>
</template>
