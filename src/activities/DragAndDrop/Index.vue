<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'
import Activity from '../Activity.vue'
import Item, { type DragAndDropItem } from './Item.vue'
import Options from './Options.vue'
import Parser, { type DragAndDropOption } from './Parser.vue'

export type DragAndDropAnswer = {
  items: DragAndDropItem[],
  selecteds: {
    value?: string
    correct?: string
  }[]
}

export type DragAndDropProps = {
  items: DragAndDropItem[]
  position?: 'top' | 'bottom' | 'both'
  shuffle?: boolean
  markerType?: MarkerType
}

const props = withDefaults(defineProps<DragAndDropProps>(), {
  position: 'both',
  shuffle: true,
  markerType: 'none'
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<DragAndDropAnswer>({ items: [], selecteds: [] })
const _items = ref<DragAndDropItem[]>(props.shuffle ? shuffle(props.items) : props.items)
const parsers = ref<InstanceType<typeof Parser>[]>([])
const options = ref<DragAndDropOption[]>([])
const availableOptions = computed(() => options.value.filter(option => option.related === undefined))

watch(availableOptions, () => {
  if (activity.value?.props.mode === 'answered') {
    return
  }

  answer.value.selecteds = options.value.map(option => {
    return {
      value: option.value,
      correct: option.related?.value
    }
  })

  if (availableOptions.value.length === options.value.length) {
    activity.value?.blank()
  } else {
    activity.value?.filled()
  }
})

const start = () => {
  _items.value = props.shuffle ? shuffle(props.items) : props.items
  options.value = []

  answer.value = {
    items: _items.value,
    selecteds: []
  }

  nextTick(() => {
    parsers.value.forEach(parser => parser.clear())
    options.value = shuffle(options.value)
  })
}

const answered = (_answer: DragAndDropAnswer) => {
  _items.value = _answer.items

  nextTick(() => {
    options.value.forEach((option, index) => {
      option.answer = _answer.selecteds[index]?.value
    })
  })
}

const check = () => {
  const total = options.value.length
  const right = options.value
    .filter(option => option.related !== undefined)
    .filter(option => compare(option.related?.value, option.selected?.related?.value))
    .length

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
    type="drag-and-drop"
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

    <Options
      v-if="availableOptions.length && (position === 'top' || position === 'both')"
      :options="availableOptions"
    />

    <div
      class="activity-drag-and-drop-items"
      w-full
      mx-auto
      my-6
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
          :options="options"
          @option="(option: DragAndDropOption) => options.push(option)"
        />
      </Item>
    </div>

    <Options
      v-if="availableOptions.length && (position === 'bottom' || position === 'both')"
      :options="availableOptions"
    />
  </Activity>
</template>
