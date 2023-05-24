<script setup lang="ts">
export type WordSearchListProps = {
  items: string[]
  selected: string[]
}

defineProps<WordSearchListProps>()
</script>

<template>
  <transition-group
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
      :key="item"
      class="activity-word-search-list-item"
      :class="{
        'bg-green-300 activity-word-search-list-item-selected': selected.indexOf(item) !== -1
      }"
      uppercase
      p-2
      lg:p-4
      m-2
      rounded
      border-2
      border-solid
      border-gray-300
      transition-all
      v-text="item"
    />
  </transition-group>
</template>
