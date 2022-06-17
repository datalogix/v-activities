<script setup lang="ts">
import { ref, computed } from 'vue'
import shuffle from 'lodash.shuffle'
import Droppable from './Droppable.vue'

export interface DragAndDropContentItem {
  type: 'text' | 'droppable'
  content: string
}

export interface DragAndDropContentOption extends DragAndDropContentItem {
  id: string
  value: string
  selected?: DragAndDropContentOption
  related?: DragAndDropContentOption
}

export interface DragAndDropContentProps {
  text: string
}

const props = defineProps<DragAndDropContentProps>()
const items = ref<DragAndDropContentItem[]>([])
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

  items.value.push({
    id: i.toString(),
    type: 'droppable',
    value: match[0].replace('[', '').replace(']', '').trim(),
    content: `
      <Droppable
        :id="items[${items.value.length}].selected?.id"
        :enabled="items[${items.value.length}].selected !== undefined"
        :content="items[${items.value.length}].selected ? items[${items.value.length}].selected.value : '&nbsp;'"
        @drop="(optionID) => drop(optionID, items[${items.value.length}])"
      />
    `
  } as DragAndDropContentOption)
}

if (props.text.length > i) {
  items.value.push({
    type: 'text',
    content: props.text.substring(i, props.text.length)
  })
}

const options = ref(items.value.filter(item => item.type !== 'text') as DragAndDropContentOption[])
const availableOptions = computed(() => options.value.filter(option => option.related === undefined))

const drop = (optionID: string, option: DragAndDropContentOption) => {
  const optionRelated = options.value.find(option => option.id === optionID)

  if (!optionRelated) return

  options.value.forEach(i => {
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

const template = {
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
    drop
  }
}

const clear = () => {
  options.value = shuffle(options.value)

  options.value.forEach((option) => {
    option.related = undefined
    option.selected = undefined
  })
}

defineExpose({
  options,
  availableOptions,
  clear
})
</script>

<template>
  <div class="activity-drag-and-drop-content">
    <component
      :is="template"
      :items="items"
    />
  </div>
</template>
