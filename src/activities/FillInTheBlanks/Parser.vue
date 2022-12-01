<script setup lang="ts">
import Input from './Input.vue'
import Select from './Select.vue'
import type { FillInTheBlanksOption } from './Index.vue'

export interface FillInTheBlanksParser {
  type: 'html' | 'input' | 'select'
  content: string
}

export interface FillInTheBlanksParserProps {
  html: string
}

const props = defineProps<FillInTheBlanksParserProps>()
const emits = defineEmits<{(e: 'option', option: FillInTheBlanksOption): Promise<void>}>()

const items = ref<FillInTheBlanksParser[]>([])

const template = computed(() => ({
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
}))

const parser = (html: string) => {
  const items: FillInTheBlanksParser[] = []
  const matches = html.matchAll(/\[[^\]]+\]/gmi)

  let i = 0
  for (const match of matches) {
    if (match.index) {
      items.push({
        type: 'html',
        content: html.substring(i, match.index)
      })
    }

    i = (match.index || 0) + match[0].length

    const options = shuffle(match[0]
      .replace('[', '')
      .replace(']', '')
      .trim()
      .split('|')
      .map((option) => option.trim()))

    const option: FillInTheBlanksOption = options.length === 1
      ? {
          type: 'input',
          value: '',
          content: `<Input
            v-model="items[${items.length}].value"
            style="width: ${options[0].length + 2}rem;"
            max-w-sm
          />`,
          correct: options[0],
          options
        }
      : {
          type: 'select',
          value: '',
          content: `<Select
            v-model="items[${items.length}].value"
            :options="items[${items.length}].options"
          />`,
          correct: options[0],
          options
        }

    emits('option', option)

    items.push(option)
  }

  if (html.length > i) {
    items.push({
      type: 'html',
      content: html.substring(i, html.length)
    })
  }

  return items
}

const clear = () => {
  items.value = parser(props.html)
}

defineExpose({
  clear
})
</script>

<template>
  <component
    :is="template"
    v-if="items.length"
    :items="items"
  />
</template>
