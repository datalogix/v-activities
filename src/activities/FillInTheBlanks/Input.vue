<script setup lang="ts">
export interface FillInTheBlanksInputProps {
  modelValue: string
}

defineProps<FillInTheBlanksInputProps>()
const emits = defineEmits<{(e: 'update:modelValue', value: string): void}>()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <input
    class="activity-fill-in-the-blanks-input"
    type="text"
    p-2
    m-1
    border
    rounded
    text-center
    :value="modelValue"
    @input="update"
  >
</template>
