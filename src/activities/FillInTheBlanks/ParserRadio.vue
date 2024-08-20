<script setup lang="ts">
export type FillInTheBlanksParserRadioProps = {
  modelValue: string
  index: number
  correct: string
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
    gap-2
    flex-inline
    items-center
    px-4
    py-3
    rounded
    border-2
    border-gray-300
    border-dashed
    bg-white
    :class="{
      'cursor-pointer': activity.props.mode !== 'answered',
      '!cursor-not-allowed': activity.props.mode === 'answered',
      'activity-fill-in-the-blanks-radio-selected !border-blue-500': modelValue === option,
      'border-green-500 !border-solid': activity.props.mode === 'preview' && option === correct && modelValue !== option,
      'flex-col-reverse': option.includes('<img')
    }"
  >
    <input
      class="activity-fill-in-the-blanks-radio"
      type="radio"
      disabled:cursor-not-allowed
      :disabled="activity.props.mode === 'answered'"
      :value="option"
      :checked="modelValue === option"
      v-bind="$attrs"
      scale-140
      @input="update"
    >
    <div v-html="option" />
  </label>
</template>
