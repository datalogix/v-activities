<script setup lang="ts">
import { replace } from '@/utils/string'

export interface HangmanWordProps {
  word: string
  rights: string[]
}

const props = defineProps<HangmanWordProps>()
const letters = replace(props.word).toLocaleUpperCase().split('')
</script>

<template>
  <div
    class="activity-hangman-word"
    flex
    space-x-2
    justify-center
    my-6
  >
    <div
      v-for="letter in letters"
      :key="letter"
      :class="{
        'activity-hangman-word-space': letter.trim() === '',
        'border-b-2 activity-hangman-word-letter': letter.trim() !== ''
      }"
      text-lg
      md:text-lg
      lg:text-2xl
      text-center
      w-4
      h-8
      md:w-8
      md:h-8
      lg:w-10
      lg:h-10
      v-text="props.rights.includes(letter) ? letter : ''"
    />
  </div>
</template>
