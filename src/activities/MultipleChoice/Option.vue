<script setup lang="ts">
export interface MultipleChoiceOptionProps {
  markerType?: boolean | 'number' | 'letter' | 'letter_uppercase'
  position: number
  type?: 'checkbox' | 'radio'
  label: string
  percentage: number
  modelValue: number[]|number|null
}

const props = withDefaults(defineProps<MultipleChoiceOptionProps>(), {
  markerType: false,
  type: 'radio'
})

const emits = defineEmits<{(e: 'update:modelValue', value: number[]|number|null): void}>()
const update = (e: Event) => {
  const input = (e.target as HTMLInputElement)
  const value = parseInt(input.value)

  if (props.type === 'radio') {
    emits('update:modelValue', value)
  }

  if (props.type === 'checkbox') {
    const modelValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []

    if (input.checked) {
      modelValue.push(value)
    } else {
      modelValue.splice(modelValue.indexOf(value), 1)
    }

    emits('update:modelValue', modelValue)
  }
}

const checked = computed(() => {
  return Array.isArray(props.modelValue)
    ? props.modelValue.includes(props.position)
    : props.modelValue === props.position
})

const markerText = computed(() => {
  if (props.markerType === 'letter') {
    return `${LETTERS[props.position].toLocaleLowerCase()}.`
  }

  if (props.markerType === 'letter_uppercase') {
    return `${LETTERS[props.position].toLocaleUpperCase()}.`
  }

  return `${props.position + 1}.`
})
</script>

<template>
  <div
    class="activity-multiple-choice-option"
    flex
    items-center
    gap-2
    mx-auto
    w-full
  >
    <label
      v-if="markerType"
      class="activity-multiple-choice-option-number"
      text-lg
      text-right
      font-semibold
      :for="`awnser${position}`"
      v-text="markerText"
    />
    <input
      :id="`awnser${position}`"
      class="activity-multiple-choice-option-input"
      w-16
      scale-120
      :type="type"
      :checked="checked"
      :value="position"
      @input="update"
    >
    <label
      class="activity-multiple-choice-option-label"
      flex-1
      :for="`awnser${position}`"
      v-html="label"
    />
  </div>
</template>
