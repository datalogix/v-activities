<script setup lang="ts">
import ParserInput from './ParserInput.vue'
import { type FillInTheBlanksField } from './Parser.vue'

export type FillInTheBlanksParserInputGroupProps = {
  modelValue: string
  index: number
  correct: string
  options: string[]
}

export type FillInTheBlanksParserInputGroupEmits = {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<FillInTheBlanksParserInputGroupProps>()
const items = ref<FillInTheBlanksField[]>(props.options.map(() => ({ value: '' } as FillInTheBlanksField)))
const emits = defineEmits<FillInTheBlanksParserInputGroupEmits>()
const update = () => emits('update:modelValue', items.value.map(item => item.value ?? '').reduce((a, b) => `${a}${b}`, ''))

defineExpose({
  getItems: () => items.value
})
</script>

<template>
  <ParserInput
    v-for="(option, i) in options"
    :ref="(el) => items[i].ref = el"
    :key="i"
    v-model="items[i].value!"
    :index="i"
    :correct="option"
    @input="update"
  />
</template>
