<script setup lang="ts">
import Activity from '../Activity.vue'
import Level from './Level.vue'
import Word from './Word.vue'
import Options from './Options.vue'

export type HangmanAnswer = {
  options: string[]
  unique: string[]
  used: string[]
  right: string[]
  wrong: string[]
}

export interface HangmanProps {
  word: string
  levels?: string[]
}

defineProps<HangmanProps>()

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<HangmanAnswer>()
const level = ref<InstanceType<typeof Level>>()
const options = ref<InstanceType<typeof Options>>()

const onRight = (_answer: HangmanAnswer) => {
  answer.value = _answer

  if (answer.value.right.length === answer.value.unique.length) {
    return activity.value?.store({ percentage: 100, result: true })
  }
}

const onWrong = (_answer: HangmanAnswer) => {
  answer.value = _answer

  if (level.value && answer.value.wrong.length >= level.value.max) {
    return activity.value?.store({ percentage: 0, result: false })
  }
}

const start = () => {
  return options.value?.run()
}

const answered = (answer: unknown) => {
  return options.value?.answered(answer as HangmanAnswer)
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    class="activity-hangman"
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

    <Level
      ref="level"
      :levels="levels"
      :current="options ? options.wrong.length : 0"
    />

    <Word
      :word="word"
      :rights="options ? options.right : []"
    />

    <Options
      ref="options"
      :word="word"
      @right="onRight"
      @wrong="onWrong"
    />
  </Activity>
</template>
