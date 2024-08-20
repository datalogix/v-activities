<script setup lang="ts">
import type { WordSearchItem } from './Index.vue'

export type WordSearchListProps = {
  items: WordSearchItem[]
  selected: WordSearchItem[]
}

defineProps<WordSearchListProps>()
</script>

<template>
  <TransitionGroup
    tag="ul"
    class="activity-word-search-list"
    flex
    flex-wrap
    items-center
    justify-center
    mx-auto
    list-none
    p-0
  >
    <li
      v-for="item in items"
      :key="item.word"
      class="activity-word-search-list-item"
      :class="{ 'activity-word-search-list-item-selected bg-green-300 border-solid border-green': selected.indexOf(item) !== -1 }"
      uppercase
      p-2
      lg:p-4
      m-2
      rounded
      border-2
      border-gray-300
      border-dashed
      transition
    >
      <Media
        :content="item.media ?? item.word"
        :img-attrs="{ class: '!w-60 !h-40' }"
        :audio-attrs="{ class: '!w-60' }"
        :video-attrs="{ class: '!w-60' }"
      />
    </li>
  </TransitionGroup>
</template>
