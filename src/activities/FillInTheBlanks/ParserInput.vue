<script setup lang="ts">
export type FillInTheBlanksParserInputProps = {
  modelValue: string
}

export type FillInTheBlanksParserInputEmits = {
  (e: 'update:modelValue', value: string): void
}

defineProps<FillInTheBlanksParserInputProps>()

const emits = defineEmits<FillInTheBlanksParserInputEmits>()
const activity = useActivity()

const update = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    class="activity-fill-in-the-blanks-input"
    type="text"
    p-2
    m-1
    border
    border-solid
    border-gray-300
    rounded
    text-center
    disabled:cursor-not-allowed
    :disabled="activity.props.mode === 'answered'"
    :value="modelValue"
    @input="update"
  >
</template>
