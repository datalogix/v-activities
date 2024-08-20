<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'
import type { MediaType } from '../../components/Media.vue'
import Activity from '../Activity.vue'
import Item from './Item.vue'
import Parser, { type FillInTheBlanksField } from './Parser.vue'

export type FillInTheBlanksItem = {
  content: string
  file?: MediaType
}

export type FillInTheBlanksAnswer = {
  items: FillInTheBlanksItem[]
  fields: {
    value?: string
    correct?: string
  }[]
}

export type FillInTheBlanksProps = {
  items: FillInTheBlanksItem[]
  shuffle?: boolean
  markerType?: MarkerType
  caseSensitive?: boolean
  specialCharacters?: boolean
}

const props = withDefaults(defineProps<FillInTheBlanksProps>(), {
  shuffle: true,
  markerType: 'none',
  caseSensitive: false,
  specialCharacters: false
})

const itemsFiltered = computed(() => props.items.filter(item => item.content))
const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<FillInTheBlanksAnswer>({ items: [], fields: [] })
const _items = ref<FillInTheBlanksItem[]>(props.shuffle ? shuffle(itemsFiltered.value) : itemsFiltered.value)
const parsers = ref<InstanceType<typeof Parser>[]>([])
const fields = ref<FillInTheBlanksField[]>([])

watch(fields, () => {
  if (activity.value?.props.mode === 'answered') {
    return
  }

  answer.value.fields = fields.value.map(field => {
    return {
      value: field.value,
      correct: field.correct
    }
  })

  if (answer.value.fields.some(field => field.value !== '')) {
    activity.value?.filled()
  } else {
    activity.value?.blank()
  }
}, { deep: true })

const start = () => {
  _items.value = props.shuffle ? shuffle(itemsFiltered.value) : itemsFiltered.value
  fields.value = []

  answer.value = {
    items: _items.value,
    fields: []
  }

  nextTick(() => {
    parsers.value.forEach(parser => parser.clear())
  })
}

const answered = (_answer: FillInTheBlanksAnswer) => {
  _items.value = _answer.items
  fields.value = []

  nextTick(() => {
    parsers.value.forEach(parser => parser.clear())

    fields.value.forEach((field, index) => {
      field.value = _answer.fields[index]?.value || ''
    })
  })
}

const check = () => {
  const total = fields.value.length
  const right = fields.value.filter(field => {
    return compare(field.value, field.correct, props.caseSensitive, props.specialCharacters)
  }).length

  return activity.value?.store({
    percentage: right ? (right * 100 / total) : 0,
    result: {
      right,
      total
    }
  })
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="fill-in-the-blanks"
    :options="props"
    @start="start"
    @answered="answered"
    @check="check"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <TransitionGroup
      tag="div"
      class="activity-fill-in-the-blanks-items"
      w-full
      mx-auto
      space-y-6
      :class="{ 'lg:space-y-10': markerType !== 'none' }"
    >
      <Item
        v-for="(item, index) in _items"
        :key="index"
        v-slot="{ content }"
        :item="item"
        :marker-type="markerType"
        :position="index"
      >
        <Parser
          ref="parsers"
          :index="index"
          :content="content"
          @field="(field: FillInTheBlanksField) => fields.push(field)"
        />
      </Item>
    </TransitionGroup>
  </Activity>
</template>
