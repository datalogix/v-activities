<script setup lang="ts">
export interface AssembleWordLettersProps {
  word: string
  used: string[]
}

const props = defineProps<AssembleWordLettersProps>()
const letters = replace(props.word).toLocaleUpperCase().split('')
const isSpace = (index: number) => props.used[index] === letters[index] && letters[index].trim() === ''
</script>

<template>
  <div
    class="activity-assemble-letters"
    flex
    space-x-2
    justify-center
    my-4
  >
    <div
      v-for="(letter, index) in letters"
      :key="letter"
      class="activity-assemble-letters-letter"
      :class="{
        'border-b-2': !isSpace(index),
        'border-b-0': isSpace(index)
      }"
      border-solid
      border-gray-300
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
      v-text="used[index] === letter ? letter : ''"
    />
  </div>
</template>
