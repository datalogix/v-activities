<script setup lang="ts">
export interface WordSearchWordListProps {
  words: string[]
  selected: string[]
}

const props = defineProps<WordSearchWordListProps>()
</script>

<template>
  <transition-group
    tag="ul"
    class="activity-word-search-words"
    flex
    flex-wrap
    items-center
    justify-center
    mx-auto
    list-none
    p-0
  >
    <li
      v-for="word in props.words"
      :key="word"
      class="activity-word-search-word"
      :class="{
        'bg-green-300 activity-word-search-word-selected': props.selected.indexOf(word) !== -1
      }"
      uppercase
      p-2
      lg:p-4
      m-2
      rounded
      border-2
      border-gray-300
      transition-all
      v-text="word"
    />
  </transition-group>
</template>
