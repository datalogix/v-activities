<script setup lang="ts">
import { ref } from 'vue'
import Activity from '../Activity.vue'
import Level from './Level.vue'
import Word from './Word.vue'
import Options from './Options.vue'
import type { HangmanOptionsActions } from './Options.vue'

export interface HangmanProps {
  word: string
  levels?: string[]
}

const props = withDefaults(defineProps<HangmanProps>(), {
  levels: undefined
})

const activity = ref<InstanceType<typeof Activity>>()
const level = ref<InstanceType<typeof Level>>()
const options = ref<InstanceType<typeof Options>>()

const right = (actions: HangmanOptionsActions) => {
  if (actions.right.length === actions.unique.length) {
    activity.value?.store(100, actions)
  }
}

const wrong = (actions: HangmanOptionsActions) => {
  if (level.value && actions.wrong.length >= level.value.max) {
    activity.value?.store(0, actions)
  }
}

const prepare = () => {
  options.value?.prepare()
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-hangman"
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

    <Level
      ref="level"
      :levels="props.levels"
      :current="options ? options.wrong.length : 0"
    />

    <Word
      :word="props.word"
      :rights="options ? options.right : []"
    />

    <Options
      ref="options"
      :word="word"
      @right="right"
      @wrong="wrong"
    />
  </Activity>
</template>
