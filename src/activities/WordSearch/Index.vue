<script setup lang="ts">
import { ref } from 'vue'
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

const props = withDefaults(defineProps<WordSearchProps>(), {
  size: 10,
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
    :display-check="false"
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
      v-if="props.position === 'top' || props.position === 'both'"
      :words="grid?.usedWords || []"
      :selected="grid?.foundWords || []"
    />

    <Grid
      ref="grid"
      :size="props.size"
      :words="props.words"
      :diagonal="props.diagonal"
      :invert="props.invert"
      :shuffle="props.shuffle"
      @complete="activity?.store(100, grid?.foundWords)"
    />

    <WordList
      v-if="props.position === 'bottom' || props.position === 'both'"
      :words="grid?.usedWords || []"
      :selected="grid?.foundWords || []"
    />
  </Activity>
</template>
