<script setup lang="ts">
import ParserInput from './ParserInput.vue'
import ParserInputGroup from './ParserInputGroup.vue'
import ParserRadio from './ParserRadio.vue'
import ParserSelect from './ParserSelect.vue'

export type FillInTheBlanksParser = {
  type: 'content' | 'input' | 'input-group' | 'radio' | 'select'
  content: string
}

export type FillInTheBlanksField = FillInTheBlanksParser & {
  value: string
  correct: string
  options?: string|string[]
  ref?: InstanceType<typeof ParserInput | typeof ParserInputGroup | typeof ParserRadio | typeof ParserSelect>
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
const items = ref<FillInTheBlanksParser[]>([])

const template = defineComponent(computed(() => ({
  template: items.value.map((item) => item.content).join(''),

  components: {
    ParserInput,
    ParserInputGroup,
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
    if (match.index && content.substring(i, match.index)) {
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
            :ref="(el) => items[${_items.length}].ref = el"
            v-model="items[${_items.length}].value"
            :index="${_items.length}"
            :correct="items[${_items.length}].correct"
            :options="items[${_items.length}].options"
          />`,
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
          :ref="(el) => items[${_items.length}].ref = el"
          v-model="items[${_items.length}].value"
          :index="${_items.length}"
          :correct="items[${_items.length}].correct"
          :options="items[${_items.length}].options"
          name="radio${props.index}"
        />`,
        correct: options[0],
        options: shuffle(options)
      }
    } else if (match[0].startsWith('[(') && match[0].endsWith(')]')) {
      const option = match[0]
        .replace('[(', '')
        .replace(')]', '')
        .trim()

      field = {
        type: 'input-group',
        value: '',
        content: `<ParserInputGroup
            :ref="(el) => items[${_items.length}].ref = el"
            v-model="items[${_items.length}].value"
            :index="${_items.length}"
            :correct="items[${_items.length}].correct"
            :options="items[${_items.length}].options"
          />`,
        correct: option,
        options: option.split('')
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
            :ref="(el) => items[${_items.length}].ref = el"
            v-model="items[${_items.length}].value"
            :index="${_items.length}"
            :correct="items[${_items.length}].correct"
          />`,
        correct: option
      }
    }

    emits('field', field)

    _items.push(field)
  }

  if (content.length > i && content.substring(i, content.length)) {
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
