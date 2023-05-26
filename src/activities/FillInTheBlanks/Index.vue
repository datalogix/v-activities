<script setup lang="ts">
import Activity from '../Activity.vue'
import Item from './Item.vue'
import Parser from './Parser.vue'

export type FillInTheBlanksMarker = 'none' | 'number' | 'letter' | 'letter_uppercase'

export type FillInTheBlanksItem = {
  content: string
  file?: File | URL | string
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
  markerType?: FillInTheBlanksMarker
  caseSensitive?: boolean
  specialCharacters?: boolean
}

const props = withDefaults(defineProps<FillInTheBlanksProps>(), {
  shuffle: true,
  markerType: 'none',
  caseSensitive: false,
  specialCharacters: false
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<FillInTheBlanksAnswer>()
const _items = ref<FillInTheBlanksItem[]>(props.shuffle ? shuffle(props.items) : props.items)
const parsers = ref<InstanceType<typeof Parser>[]>([])

watch(() => parsers.value.map((s) => s.items), () => {
  if (activity.value?.props.mode === 'answered') {
    return
  }

  if (!answer.value) {
    answer.value = {
      items: _items.value,
      fields: []
    }
  }

  answer.value!.fields = []

  parsers.value.forEach(parser => {
    answer.value!.fields.push(
      ...parser.items
        .filter(item => item.type !== 'content')
        .map(item => {
          return {
            value: item.value,
            correct: item.correct
          }
        })
    )
  })

  if (answer.value!.fields.some(item => item.value !== '')) {
    activity.value?.filled()
  } else {
    activity.value?.blank()
  }
}, { deep: true })

const start = () => {
  _items.value = props.shuffle ? shuffle(props.items) : props.items

  answer.value = {
    items: _items.value,
    fields: []
  }

  nextTick(() => {
    parsers.value.forEach(parser => parser.clear())
  })
}

const answered = (_answer: FillInTheBlanksAnswer) => {
  answer.value = _answer
  _items.value = answer.value.items

  nextTick(() => {
    let i = 0
    parsers.value.forEach(parser => {
      parser.clear()

      parser.items.filter(item => item.type !== 'content').forEach(item => {
        if (answer.value?.fields && answer.value?.fields[i]) {
          item.value = answer.value?.fields[i].value
        }

        i++
      })
    })
  })
}

const check = () => {
  const total = answer.value!.fields.length
  const right = answer.value!.fields.filter(item => {
    return compare(item.value, item.correct, props.caseSensitive, props.specialCharacters)
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

    <div
      class="activity-fill-in-the-blanks-items"
      w-full
      mx-auto
    >
      <Item
        v-for="(item, index) in _items"
        v-slot="{ content }"
        :key="index"
        :item="item"
        :marker-type="markerType"
        :position="index"
      >
        <Parser
          ref="parsers"
          :content="content"
        />
      </Item>
    </div>
  </Activity>
</template>
