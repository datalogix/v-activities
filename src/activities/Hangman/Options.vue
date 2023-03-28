<script setup lang="ts">
import type { HangmanAnswer } from './Index.vue'

export interface HangmanOptionsProps {
  word: string
}

export type HangmanOptionsEmits = {
  (e: 'right', params: HangmanAnswer): Promise<void>
  (e: 'wrong', params: HangmanAnswer): Promise<void>
}

const activity = useActivity()
const props = defineProps<HangmanOptionsProps>()
const emits = defineEmits<HangmanOptionsEmits>()
const MAX_OPTIONS = 20
const unique = ref<string[]>(Array.from(new Set(replace(props.word, '', { space: false }).toLocaleUpperCase().split(''))))
const options = ref<string[]>([])
const used = ref<string[]>([])
const right = ref<string[]>([])
const wrong = ref<string[]>([])

const isDisabled = (option: string) => {
  return used.value.includes(option)
}

const onSelect = (option: string) => {
  if (isDisabled(option) || activity.props.mode === 'answered') {
    return
  }

  if (!used.value.includes(option)) {
    used.value.push(option)
  }

  if (!unique.value.includes(option)) {
    if (!wrong.value.includes(option)) {
      wrong.value.push(option)

      emits('wrong', {
        options: options.value,
        unique: unique.value,
        used: used.value,
        right: right.value,
        wrong: wrong.value
      })
    }
    return
  }

  if (!right.value.includes(option)) {
    right.value.push(option)

    emits('right', {
      options: options.value,
      unique: unique.value,
      used: used.value,
      right: right.value,
      wrong: wrong.value
    })
  }
}

const run = () => {
  options.value = shuffle(generateUniqueStringFromString(unique.value.join(''), MAX_OPTIONS).split(''))
  used.value = []
  right.value = []
  wrong.value = []
}

const answered = (answer: HangmanAnswer) => {
  options.value = answer.options
  used.value = answer.used
  right.value = answer.right
  wrong.value = answer.wrong
}

defineExpose({
  unique,
  used,
  right,
  wrong,
  run,
  answered
})

run()
</script>

<template>
  <transition-group
    class="activity-hangman-options"
    tag="div"
    max-w-2xl
    flex
    justify-center
    flex-wrap
    gap-2
    mx-auto
  >
    <Button
      v-for="option in options"
      :key="option"
      :disabled="isDisabled(option)"
      class="activity-hangman-option"
      :class="{
        'activity-hangman-option-disabled': isDisabled(option),
        'activity-hangman-option-enabled': !isDisabled(option),
        'activity-hangman-option-answered !cursor-not-allowed': activity.props.mode === 'answered'
      }"
      border
      border-solid
      uppercase
      text-base
      md:text-xl
      lg:text-2xl
      text-center
      w-10
      h-10
      md:w-12
      md:h-12
      lg:w-14
      lg:h-14
      @click="onSelect(option)"
    >
      {{ option }}
    </Button>
  </transition-group>
</template>
