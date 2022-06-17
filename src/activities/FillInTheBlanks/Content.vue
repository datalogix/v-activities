<script setup lang="ts">
import { ref } from 'vue'
import shuffle from 'lodash.shuffle'
import Input from './Input.vue'
import Select from './Select.vue'

export interface FillInTheBlanksContentItem {
  type: 'text' | 'input' | 'select'
  content: string
}

export interface FillInTheBlanksContentOption extends FillInTheBlanksContentItem {
  value: string
  correct: string
  options: string[]
}

export interface FillInTheBlanksContentProps {
  text: string
}

const props = defineProps<FillInTheBlanksContentProps>()
const items = ref<FillInTheBlanksContentItem[]>([])
const matches = props.text.matchAll(/\[[^\]]+\]/gmi)

let i = 0
for (const match of matches) {
  if (match.index) {
    items.value.push({
      type: 'text',
      content: props.text.substring(i, match.index)
    })
  }

  i = (match.index || 0) + match[0].length

  const options = match[0]
    .replace('[', '')
    .replace(']', '')
    .trim()
    .split('|')
    .map((option) => option.trim())

  if (options.length === 1) {
    items.value.push({
      type: 'input',
      value: '',
      content: `<Input v-model="items[${items.value.length}].value" />`,
      correct: options[0]
    } as FillInTheBlanksContentOption)
  }

  if (options.length > 1) {
    items.value.push({
      type: 'select',
      value: '',
      content: `<Select
        v-model="items[${items.value.length}].value"
        :options="items[${items.value.length}].options"
      />`,
      correct: options[0],
      options
    } as FillInTheBlanksContentOption)
  }
}

if (props.text.length > i) {
  items.value.push({
    type: 'text',
    content: props.text.substring(i, props.text.length)
  })
}

const options = ref(items.value.filter(item => item.type !== 'text') as FillInTheBlanksContentOption[])

const template = {
  template: items.value.map((item) => item.content).join(''),

  components: {
    Input,
    Select
  },

  props: {
    items: {
      required: true,
      type: Object
    }
  }
}

const clear = () => {
  options.value.forEach((option) => {
    option.value = ''
    option.options = shuffle(option.options)
  })
}

defineExpose({
  options,
  clear
})
</script>

<template>
  <div class="activity-fill-in-the-blanks-content">
    <component
      :is="template"
      :items="items"
    />
  </div>
</template>
