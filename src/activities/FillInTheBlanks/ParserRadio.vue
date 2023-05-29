<script setup lang="ts">
export type FillInTheBlanksParserRadioProps = {
  modelValue: string
  options: string[]
}

export type FillInTheBlanksParserRadioEmits = {
  (e: 'update:modelValue', value: string): void
}

defineProps<FillInTheBlanksParserRadioProps>()
const emits = defineEmits<FillInTheBlanksParserRadioEmits>()
const activity = useActivity()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <label
    v-for="option in options"
    :key="option"
    class="mx-2 space-x-2"
    :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
  >
    <input
      class="activity-fill-in-the-blanks-radio"
      type="radio"
      disabled:cursor-not-allowed
      :disabled="activity.props.mode === 'answered'"
      :value="option"
      :checked="modelValue === option"
      v-bind="$attrs"
      @input="update"
    >
    <span>{{ option }}</span>
  </label>
</template>
