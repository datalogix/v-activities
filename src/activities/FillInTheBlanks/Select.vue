<script setup lang="ts">
export interface FillInTheBlanksSelectProps {
  modelValue: string
  options: string[]
}

const props = defineProps<FillInTheBlanksSelectProps>()
const emits = defineEmits<{(e: 'update:modelValue', value: string): void}>()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLSelectElement).value)
</script>

<template>
  <select
    class="activity-fill-in-the-blanks-select"
    p-2
    m-1
    border
    rounded
    :value="props.modelValue"
    @input="update"
  >
    <option
      value=""
      v-text="'---'"
    />
    <option
      v-for="option in props.options"
      :key="option"
      :value="option"
      v-text="option"
    />
  </select>
</template>
