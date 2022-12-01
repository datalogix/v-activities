<script setup lang="ts">
import Activity from '../Activity.vue'
import Grid from './Grid.vue'
import WordList from './WordList.vue'

export interface WordSearchProps {
  size: number
  words: string[]
  diagonal?: boolean
  invert?: boolean
  position?: 'top' | 'bottom' | 'both'
  shuffle?: boolean
}

withDefaults(defineProps<WordSearchProps>(), {
  size: 8,
  position: 'top',
  diagonal: false,
  invert: false,
  shuffle: true
})

const activity = ref<InstanceType<typeof Activity>>()
const grid = ref<InstanceType<typeof Grid>>()

const prepare = () => {
  grid.value?.build()
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-word-search"
    :can-check="false"
    @prepare="prepare"
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
      :diagonal="diagonal"
      :invert="invert"
      :shuffle="shuffle"
      @complete="activity?.store(100, grid?.foundWords)"
    />

    <WordList
      v-if="position === 'bottom' || position === 'both'"
      :words="grid?.usedWords || []"
      :selected="grid?.foundWords || []"
      mt-4
    />
  </Activity>
</template>
