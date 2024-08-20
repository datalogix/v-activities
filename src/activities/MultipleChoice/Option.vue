<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'

export type MultipleChoiceOptionValue = number[] | number | undefined

export type MultipleChoiceOptionType = 'checkbox' | 'radio'

export type MultipleChoiceOption = {
  label: string
  value: number
}

export type MultipleChoiceOptionProps = {
  markerType?: MarkerType
  position: number
  type?: MultipleChoiceOptionType
  option: MultipleChoiceOption
  modelValue: MultipleChoiceOptionValue
}

export type MultipleChoiceOptionEmits = {
  (e: 'update:modelValue', value: MultipleChoiceOptionValue): void
}

const props = withDefaults(defineProps<MultipleChoiceOptionProps>(), {
  markerType: 'none',
  type: 'radio'
})

const emits = defineEmits<MultipleChoiceOptionEmits>()
const activity = useActivity()

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
</script>

<template>
  <label
    class="activity-multiple-choice-option has-[:checked]:border-blue-500"
    :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
    cursor-pointer
    mx-auto
    w-full
    rounded
    p-4
    flex
    items-center
    gap-4
    scale-95
    transition
    duration-300
    hover:scale-100
    border-2
    border-gray-300
    border-dashed
    shadow-lg
    bg-white
  >
    <Marker
      class="activity-multiple-choice-option-position"
      :type="markerType"
      :position="position"
    />
    <input
      :id="`awnser${position}`"
      class="activity-multiple-choice-option-input"
      :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
      cursor-pointer
      w-16
      scale-140
      :type="type"
      :checked="checked"
      :value="position"
      :disabled="activity.props.mode === 'answered'"
      @input="update"
    >
    <span
      class="activity-multiple-choice-option-label"
      flex-1
      :for="`awnser${position}`"
      v-html="option.label"
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
      <b text-sm>{{ option.value }}</b>
    </span>
  </label>
</template>
