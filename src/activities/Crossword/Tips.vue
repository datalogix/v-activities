<script setup lang="ts">
import type { CrosswordItem } from './Index.vue'

export type CrosswordTipsProps = {
  items: CrosswordItem[]
}

export type CrosswordTipsEmits = {
  (e: 'select', item: CrosswordItem): void
}

const props = defineProps<CrosswordTipsProps>()
const emits = defineEmits<CrosswordTipsEmits>()
const activity = useActivity()
const tips = ref(props.items.filter(item => !!item.tip && !item.fixed))
</script>

<template>
  <div
    class="activity-crossword-tips"
    flex
    items-center
    justify-center
  >
    <ol
      class="activity-crossword-tips-list"
      p-0
      m-0
    >
      <li
        v-for="(item, index) in tips"
        :key="index"
        class="activity-crossword-tips-item"
        :class="{
          '!cursor-not-allowed': activity.props.mode === 'answered',
        }"
        cursor-pointer
        text-base
        md:text-lg
        lg:text-xl
        my-2
        @click="emits('select', item)"
        v-html="`${item.position}. ${item.tip}`"
      />
    </ol>
  </div>
</template>
