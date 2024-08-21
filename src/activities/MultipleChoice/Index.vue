<script setup lang="ts">
import type { MarkerType } from '../../components/Marker.vue'
import Activity from '../Activity.vue'
import Option, {
  type MultipleChoiceOption,
  type MultipleChoiceOptionType,
  type MultipleChoiceOptionValue
} from './Option.vue'

export type MultipleChoiceAnswer = {
  selecteds: MultipleChoiceOptionValue
  options: MultipleChoiceOption[]
}

export type MultipleChoiceProps = {
  options: MultipleChoiceOption[]
  type?: MultipleChoiceOptionType
  cols?: number
  shuffle?: boolean
  markerType?: MarkerType
}

const props = withDefaults(defineProps<MultipleChoiceProps>(), {
  type: 'radio',
  cols: 1,
  shuffle: true,
  markerType: 'none'
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<MultipleChoiceAnswer>()
const answers = ref<MultipleChoiceOptionValue>()
const _options = ref<MultipleChoiceOption[]>(props.shuffle ? shuffle(props.options) : props.options)

watch(answers, selecteds => {
  if (activity.value?.props.mode === 'answered') {
    return
  }

  if (Array.isArray(selecteds) ? selecteds.length > 0 : selecteds !== undefined) {
    answer.value!.selecteds = selecteds
    activity.value?.filled()
  } else {
    answer.value!.selecteds = []
    activity.value?.blank()
  }
})

const start = () => {
  answers.value = undefined
  _options.value = props.shuffle ? shuffle(props.options) : props.options

  answer.value = {
    selecteds: [],
    options: _options.value
  }
}

const answered = (_answer: MultipleChoiceAnswer) => {
  answers.value = _answer.selecteds
  _options.value = _answer.options
}

const check = () => {
  const selecteds = _options.value.filter((option, index) => {
    return Array.isArray(answers.value)
      ? answers.value.includes(index)
      : answers.value === index
  })

  const total = selecteds
    .map((selected) => selected.value)
    .reduce((previousPercentage, currentPercentage) => previousPercentage + currentPercentage, 0)

  const percentage = selecteds.length > 0 ? total / selecteds.length : null

  const result = Array.isArray(answers.value)
    ? { right: percentage || 0, total }
    : (
        (_options.value.filter((option) => option.value !== 100).length === _options.value.length - 1)
          ? percentage
          : (percentage !== null && percentage !== 0)
      )

  return activity.value?.store({
    percentage,
    result
  })
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="multiple-choice"
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
      class="activity-multiple-choice-options"
      :class="{
        'md:grid-cols-1': cols === 1,
        'md:grid-cols-2': cols === 2,
        'md:grid-cols-3': cols === 3,
        'md:grid-cols-4': cols === 4,
        'md:grid-cols-5': cols === 5,
        'md:grid-cols-6': cols === 6,
        'md:grid-cols-7': cols === 7,
        'md:grid-cols-8': cols === 8,
        'md:grid-cols-9': cols === 9,
        'md:grid-cols-10': cols === 10,
        'md:grid-cols-11': cols === 11,
        'md:grid-cols-12': cols === 12,
        'lg:gap-10': markerType !== 'none'
      }"
      grid
      grid-cols-1
      gap-6
    >
      <Option
        v-for="(option, index) in _options"
        :key="option.label"
        v-model="answers"
        :marker-type="markerType"
        :position="index"
        :type="type"
        :option="option"
      />
    </TransitionGroup>
  </Activity>
</template>
