<script setup lang="ts">
import Activity from '../Activity.vue'
import Option from './Option.vue'

export type MultipleChoiceValue = number[] | number | undefined

export type MultipleChoiceType = 'checkbox' | 'radio'

export type MultipleChoiceMarker = 'none' | 'number' | 'letter' | 'letter_uppercase'

export type MultipleChoiceOption = {
  label: string
  value: number
}

export type MultipleChoiceAnswer = {
  selecteds: MultipleChoiceValue
  options: MultipleChoiceOption[]
}

export interface MultipleChoiceProps {
  options: MultipleChoiceOption[]
  type?: MultipleChoiceType
  cols?: number
  shuffle?: boolean
  markerType?: MultipleChoiceMarker
}

const props = withDefaults(defineProps<MultipleChoiceProps>(), {
  type: 'radio',
  cols: 1,
  shuffle: true,
  markerType: 'none'
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<MultipleChoiceAnswer>()
const answers = ref<MultipleChoiceValue>()
const options = ref<MultipleChoiceOption[]>([])

watch(answers, selecteds => {
  answer.value = (Array.isArray(selecteds) ? selecteds.length > 0 : selecteds !== undefined)
    ? {
        selecteds,
        options: options.value
      }
    : undefined
})

const start = () => {
  answers.value = undefined
  options.value = props.shuffle ? shuffle(props.options) : props.options
}

const answered = (_answer: unknown) => {
  answers.value = (_answer as MultipleChoiceAnswer).selecteds
  options.value = (_answer as MultipleChoiceAnswer).options
}

const check = () => {
  const selecteds = options.value.filter((option, index) => {
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
        (options.value.filter((option) => option.value !== 100).length === options.value.length - 1)
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

    <div
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
        'md:grid-cols-12': cols === 12
      }"
      m-0
      p-0
      list-none
      grid
      grid-cols-1
      gap-4
    >
      <Option
        v-for="(option, index) in options"
        :key="index"
        v-model="answers"
        :marker-type="markerType"
        :position="index"
        :type="type"
        :label="option.label"
        :value="option.value"
      />
    </div>
  </Activity>
</template>
