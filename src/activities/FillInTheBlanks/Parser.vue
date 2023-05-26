<script setup lang="ts">
import ParserInput from './ParserInput.vue'
import ParserRadio from './ParserRadio.vue'
import ParserSelect from './ParserSelect.vue'

export type FillInTheBlanksParser = {
  type: 'content' | 'input' | 'radio' | 'select'
  content: string
  value?: string
  correct?: string
  options?: string[]
}

export type FillInTheBlanksParserProps = {
  content: string
}

const props = defineProps<FillInTheBlanksParserProps>()
const activity = useActivity()
const items = ref<FillInTheBlanksParser[]>([])

const template = defineComponent(computed(() => ({
  template: items.value.map((item) => item.content).join(''),

  components: {
    ParserInput,
    ParserRadio,
    ParserSelect
  },

  props: {
    items: {
      required: true,
      type: Object
    }
  }
})))

const parser = (content: string) => {
  const _items: FillInTheBlanksParser[] = []
  const matches = content.matchAll(/\[[^\]]+\]/gmi)

  let i = 0
  for (const match of matches) {
    if (match.index) {
      _items.push({
        type: 'content',
        content: content.substring(i, match.index)
      })
    }

    i = (match.index || 0) + match[0].length

    if (match[0].includes('|')) {
      const options = match[0]
        .replace('[', '')
        .replace(']', '')
        .trim()
        .split('|')
        .map((option) => option.trim())

      _items.push({
        type: 'select',
        value: '',
        content: `<ParserSelect
            v-model="items[${_items.length}].value"
            :options="items[${_items.length}].options"
          />${activity.props.mode === 'preview' ? `(${options[0]})` : ''}`,
        correct: options[0],
        options: shuffle(options)
      })
    } else if (match[0].includes('\\')) {
      const options = match[0]
        .replace('[', '')
        .replace(']', '')
        .trim()
        .split('\\')
        .map((option) => option.trim())

      _items.push({
        type: 'radio',
        value: '',
        content: `<ParserRadio
          v-model="items[${_items.length}].value"
          name="radio${i}"
          :options="items[${_items.length}].options"
        />${activity.props.mode === 'preview' ? `(${options[0]})` : ''}`,
        correct: options[0],
        options: shuffle(options)
      })
    } else {
      const option = match[0]
        .replace('[', '')
        .replace(']', '')
        .trim()

      _items.push({
        type: 'input',
        value: '',
        content: `<ParserInput
            v-model="items[${_items.length}].value"
            style="width: ${option.length + 2}rem;max-width: 24rem;"
            placeholder="${activity.props.mode === 'preview' ? option : ''}"
          />`,
        correct: option
      })
    }
  }

  if (content.length > i) {
    _items.push({
      type: 'content',
      content: content.substring(i, content.length)
    })
  }

  return _items
}

const clear = () => {
  items.value = parser(props.content)
}

clear()

defineExpose({
  items,
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
