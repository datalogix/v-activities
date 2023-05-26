<script setup lang="ts">
import type { MultipleChoiceValue, MultipleChoiceType, MultipleChoiceMarker } from './Index.vue'

export type MultipleChoiceOptionProps = {
  markerType?: MultipleChoiceMarker
  position: number
  type?: MultipleChoiceType
  label: string
  value: number
  modelValue: MultipleChoiceValue
}

export type MultipleChoiceOptionEmits = {
  (e: 'update:modelValue', value: MultipleChoiceValue): void
}

const activity = useActivity()

const props = withDefaults(defineProps<MultipleChoiceOptionProps>(), {
  markerType: 'none',
  type: 'radio'
})

const emits = defineEmits<MultipleChoiceOptionEmits>()

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
  if (props.markerType === 'none') {
    return false
  }

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
      v-if="markerText"
      class="activity-multiple-choice-option-position"
      :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
      text-sm
      md:text-base
      lg:text-lg
      font-semibold
      :for="`awnser${position}`"
      v-text="markerText"
    />
    <input
      :id="`awnser${position}`"
      class="activity-multiple-choice-option-input"
      :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
      w-16
      scale-120
      :type="type"
      :checked="checked"
      :value="position"
      :disabled="activity.props.mode === 'answered'"
      @input="update"
    >
    <label
      class="activity-multiple-choice-option-label"
      :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
      flex-1
      :for="`awnser${position}`"
      v-html="label"
    />
    <span
      v-if="activity.props.mode === 'preview'"
      class="activity-multiple-choice-option-value"
      text-center
      flex
      flex-col
      space-y--1
    >
      <span text-xs>Valor</span>
      <b text-sm>{{ value }}</b>
    </span>
  </div>
</template>
