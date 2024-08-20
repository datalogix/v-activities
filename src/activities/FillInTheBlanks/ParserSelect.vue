<script setup lang="ts">
export type FillInTheBlanksParserSelectProps = {
  modelValue: string
  index: number
  correct: string
  options: string[]
}

export type FillInTheBlanksParserSelectEmits = {
   (e: 'update:modelValue', value: string): void
}

defineProps<FillInTheBlanksParserSelectProps>()

const emits = defineEmits<FillInTheBlanksParserSelectEmits>()
const activity = useActivity()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLSelectElement).value)
</script>

<template>
  <select
    class="activity-fill-in-the-blanks-select"
    p-2
    border-2
    border-gray-300
    border-dashed
    rounded
    disabled:cursor-not-allowed
    :disabled="activity.props.mode === 'answered'"
    :value="modelValue"
    @input="update"
  >
    <option
      value=""
      v-text="activity.props.mode === 'preview' ? `${correct}&nbsp;&#10003;` : '---'"
    />
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      v-html="option"
    />
  </select>
</template>
