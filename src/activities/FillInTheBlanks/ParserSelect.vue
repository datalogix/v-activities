<script setup lang="ts">
export type FillInTheBlanksParserSelectProps = {
  modelValue: string
  options: string[]
}

defineProps<FillInTheBlanksParserSelectProps>()
const emits = defineEmits<{(e: 'update:modelValue', value: string): void}>()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLSelectElement).value)
const activity = useActivity()
</script>

<template>
  <select
    class="activity-fill-in-the-blanks-select"
    p-2
    m-1
    border
    border-solid
    border-gray-300
    disabled:cursor-not-allowed
    rounded
    :disabled="activity.props.mode === 'answered'"
    :value="modelValue"
    @input="update"
  >
    <option
      value=""
      v-text="'---'"
    />
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      v-text="option"
    />
  </select>
</template>
