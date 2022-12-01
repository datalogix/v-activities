<script setup lang="ts">
import Droppable from './Droppable.vue'
import type { DragAndDropOption } from './Index.vue'

export interface DragAndDropParser {
  type: 'html' | 'droppable'
  content: string
}

export interface DragAndDropParserProps {
  options: DragAndDropOption[]
  html: string
}

const props = defineProps<DragAndDropParserProps>()
const emits = defineEmits<{(e: 'option', option: DragAndDropOption): Promise<void>}>()

const items = ref<DragAndDropParser[]>([])

const template = computed(() => ({
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
    drop (optionID: string, option: DragAndDropOption) {
      const optionRelated = props.options.find(option => option.id === optionID)

      if (!optionRelated) return

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
}))

const parser = (html: string) => {
  const items: DragAndDropParser[] = []
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

    const option: DragAndDropOption = {
      id: props.options.length.toString(),
      type: 'droppable',
      value: match[0].replace('[', '').replace(']', '').trim(),
      content: `
        <Droppable
          :id="items[${items.length}].selected?.id"
          :enabled="items[${items.length}].selected !== undefined"
          :content="items[${items.length}].selected ? items[${items.length}].selected.value : '&nbsp;'"
          @drop="(optionID) => drop(optionID, items[${items.length}])"
        />
      `
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
