<script setup lang="ts">
export interface CrosswordTipsProps {
  tips: (string | undefined)[]
}

const props = defineProps<CrosswordTipsProps>()
const emits = defineEmits<{(e: 'select', index: number): void}>()
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
        v-for="(tip, index) in props.tips"
        :key="tip"
        class="activity-crossword-tips-item"
        cursor-pointer
        text-base
        md:text-lg
        lg:text-xl
        my-2
        @click="emits('select', index)"
        v-html="tip"
      />
    </ol>
  </div>
</template>
