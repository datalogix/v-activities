<script setup lang="ts">
import ParserInput from './ParserInput.vue'
import ParserRadio from './ParserRadio.vue'
import ParserSelect from './ParserSelect.vue'

export type FillInTheBlanksParser = {
  type: 'content' | 'input' | 'radio' | 'select'
  content: string
}

export type FillInTheBlanksField = FillInTheBlanksParser & {
  value?: string
  correct?: string
  options?: string[]
}

export type FillInTheBlanksParserProps = {
  index: number
  content: string
}

export type FillInTheBlanksParserEmits = {
  (e: 'field', option: FillInTheBlanksField): Promise<void>
}

const props = defineProps<FillInTheBlanksParserProps>()
const emits = defineEmits<FillInTheBlanksParserEmits>()
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

    let field = {} as FillInTheBlanksField

    if (match[0].includes('|')) {
      const options = match[0]
        .replace('[', '')
        .replace(']', '')
        .trim()
        .split('|')
        .map((option) => option.trim())

      field = {
        type: 'select',
        value: '',
        content: `<ParserSelect
            v-model="items[${_items.length}].value"
            :options="items[${_items.length}].options"
          />${activity.props.mode === 'preview' ? `(${options[0]})` : ''}`,
        correct: options[0],
        options: shuffle(options)
      }
    } else if (match[0].includes('\\')) {
      const options = match[0]
        .replace('[', '')
        .replace(']', '')
        .trim()
        .split('\\')
        .map((option) => option.trim())

      field = {
        type: 'radio',
        value: '',
        content: `<ParserRadio
          v-model="items[${_items.length}].value"
          name="radio${props.index}"
          :options="items[${_items.length}].options"
        />${activity.props.mode === 'preview' ? `(${options[0]})` : ''}`,
        correct: options[0],
        options: shuffle(options)
      }
    } else {
      const option = match[0]
        .replace('[', '')
        .replace(']', '')
        .trim()

      field = {
        type: 'input',
        value: '',
        content: `<ParserInput
            v-model="items[${_items.length}].value"
            style="width: ${option.length + 2}rem;max-width: 24rem;"
            placeholder="${activity.props.mode === 'preview' ? option : ''}"
          />`,
        correct: option
      }
    }

    emits('field', field)

    _items.push(field)
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
