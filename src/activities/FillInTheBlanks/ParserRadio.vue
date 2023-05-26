<script setup lang="ts">
export type FillInTheBlanksParserRadioProps = {
  modelValue: string
  options: string[]
}

defineProps<FillInTheBlanksParserRadioProps>()
const emits = defineEmits<{(e: 'update:modelValue', value: string): void}>()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLInputElement).value)
const activity = useActivity()
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
