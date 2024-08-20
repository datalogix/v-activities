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
  position?: 'fixed' | 'top' | 'bottom' | 'all'
  shuffle?: boolean
  markerType?: MarkerType
}

const props = withDefaults(defineProps<DragAndDropProps>(), {
  position: 'fixed',
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

    <template
      v-if="(position === 'fixed' || position === 'all') && availableOptions.length"
      #activity-fixed
    >
      <div
        shadow-inner
        bg-gray-50
      >
        <p
          font-semibold
          p-6
          pb-0
          text-center
          md:text-left
        >
          Arrastes os elementos baixo para sua determinada posição:
        </p>

        <Options
          :options="availableOptions"
          class="!flex-nowrap !justify-start"
          overflow-x-auto
          p-4
          md:p-6
        />
      </div>
    </template>

    <Options
      v-if="availableOptions.length && (position === 'top' || position === 'all')"
      :options="availableOptions"
      mb-4
    />

    <TransitionGroup
      tag="div"
      class="activity-drag-and-drop-items"
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
          :content="content"
          :options="options"
          @option="(option: DragAndDropOption) => options.push(option)"
        />
      </Item>
    </TransitionGroup>

    <Options
      v-if="availableOptions.length && (position === 'bottom' || position === 'all')"
      :options="availableOptions"
      mt-4
    />
  </Activity>
</template>
