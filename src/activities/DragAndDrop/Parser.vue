<script setup lang="ts">
import Droppable from './Droppable.vue'

export type DragAndDropParser = {
  type: 'content' | 'droppable'
  content: string
}

export type DragAndDropOption = DragAndDropParser & {
  id: string
  value: string
  answer?: string
  selected?: DragAndDropOption
  related?: DragAndDropOption
}

export type DragAndDropParserProps = {
  options: DragAndDropOption[]
  content: string
}

export type DragAndDropParserEmits = {
  (e: 'option', option: DragAndDropOption): Promise<void>
}

const props = defineProps<DragAndDropParserProps>()
const emits = defineEmits<DragAndDropParserEmits>()
const items = ref<DragAndDropParser[]>([])

const template = defineComponent(computed(() => ({
  template: items.value.map((item) => item.content).join(''),

  components: {
    Droppable
  },

  props: {
    items: {
      required: true,
      type: Object
    }
  },

  methods: {
    drop (id: string, option: DragAndDropOption) {
      const optionRelated = props.options.find(o => o.id === id)

      if (!optionRelated) {
        return
      }

      props.options.forEach(i => {
        if (i.selected === optionRelated) {
          i.selected.related = undefined
          i.selected = undefined
        }
      })

      if (option.selected) {
        option.selected.related = undefined
      }

      option.selected = optionRelated
      optionRelated.related = option
    }
  }
})))

const parser = (content: string) => {
  const _items: DragAndDropParser[] = []
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

    const option: DragAndDropOption = {
      id: props.options.length.toString(),
      type: 'droppable',
      value: match[0].replace('[', '').replace(']', '').trim(),
      content: `
        <Droppable
          :option="items[${_items.length}]"
          @drop="drop"
        />
      `
    }

    emits('option', option)

    _items.push(option)
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
