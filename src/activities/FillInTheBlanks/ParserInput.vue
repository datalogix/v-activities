<script setup lang="ts">
import { type FillInTheBlanksField } from './Parser.vue'

export type FillInTheBlanksParserInputProps = {
  modelValue: string
  index: number
  correct: string
}

export type FillInTheBlanksParserInputEmits = {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<FillInTheBlanksParserInputProps>()
const emits = defineEmits<FillInTheBlanksParserInputEmits>()
const activity = useActivity()
const update = (e: Event) => emits('update:modelValue', (e.target as HTMLInputElement).value)
const parent = getCurrentInstance()?.parent
const items = (parent?.exposed?.getItems() ?? parent?.props?.items) as FillInTheBlanksField[]

const prevInput = () => {
  items[props.index - 1]?.ref?.$el?.focus()
  items[props.index - 1]?.ref?.$el?.select()
}

const nextInput = () => {
  items[props.index + 1]?.ref?.$el?.focus()
  items[props.index + 1]?.ref?.$el?.select()
}

const keydown = (event: KeyboardEvent) => {
  if (props.correct.length !== 1) {
    return
  }

  if (event.key.toLocaleLowerCase() === 'arrowleft') {
    return prevInput()
  }

  if (event.key.toLocaleLowerCase() === 'arrowright') {
    return nextInput()
  }

  if (!props.modelValue && event.key.toLocaleLowerCase() === 'backspace') {
    event.preventDefault()
    return prevInput()
  }
}

const keyup = (event: KeyboardEvent) => {
  if (props.correct.length !== 1) {
    return
  }

  if (event.key.toLocaleLowerCase() === 'backspace' ||
    event.key.toLocaleLowerCase() === 'tab' ||
    event.key.toLocaleLowerCase() === 'arrowleft' ||
    event.key.toLocaleLowerCase() === 'arrowright') {
    return event.preventDefault()
  }

  if (props.modelValue) {
    return nextInput()
  }
}
</script>

<template>
  <input
    class="activity-fill-in-the-blanks-input"
    type="text"
    p-2
    border-2
    border-gray-300
    border-dashed
    rounded
    text-center
    disabled:cursor-not-allowed
    :disabled="activity.props.mode === 'answered'"
    :value="modelValue"
    :placeholder="activity.props.mode === 'preview' ? correct : ''"
    :maxlength="correct.length > 1 ? undefined : 1"
    :style="`width: ${correct.length + 2}rem;max-width: 24rem;`"
    @keydown="keydown"
    @keyup="keyup"
    @input="update"
  >
</template>
