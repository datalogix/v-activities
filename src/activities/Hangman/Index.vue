<script setup lang="ts">
import Activity from '../Activity.vue'
import Level from './Level.vue'
import Word from './Word.vue'
import Items from './Items.vue'

export type HangmanAnswer = {
  items: string[]
  unique: string[]
  used: string[]
  right: string[]
  wrong: string[]
}

export type HangmanProps = {
  word: string
  levels?: string[]
}

const props = defineProps<HangmanProps>()

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<HangmanAnswer>()
const level = ref<InstanceType<typeof Level>>()
const items = ref<InstanceType<typeof Items>>()

const right = (_answer: HangmanAnswer) => {
  activity.value?.filled()
  answer.value = _answer

  if (answer.value.right.length === answer.value.unique.length) {
    return activity.value?.store({ percentage: 100, result: true })
  }
}

const wrong = (_answer: HangmanAnswer) => {
  activity.value?.filled()
  answer.value = _answer

  if (level.value && answer.value.wrong.length >= level.value.max) {
    return activity.value?.store({ percentage: 0, result: false })
  }
}

const start = () => {
  items.value?.start()

  answer.value = {
    items: items.value!.items,
    unique: items.value!.unique,
    used: [],
    right: [],
    wrong: []
  }
}

const answered = (_answer: HangmanAnswer) => {
  return items.value?.answered(_answer)
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="hangman"
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

    <Level
      ref="level"
      :levels="levels"
      :current="items?.wrong.length ?? 0"
    />

    <Word
      :word="word"
      :rights="items?.right ?? []"
    />

    <Items
      ref="items"
      :word="word"
      @right="right"
      @wrong="wrong"
    />
  </Activity>
</template>
