<script setup lang="ts">
import Activity from '../Activity.vue'
import Option from './Option.vue'

export interface MultipleChoiceOption {
  label: string
  percentage: number
}

export interface MultipleChoiceProps {
  options: MultipleChoiceOption[]
  type?: 'checkbox' | 'radio'
  cols?: number
  shuffle?: boolean
  markerType?: boolean | 'number' | 'letter' | 'letter_uppercase'
}

const props = withDefaults(defineProps<MultipleChoiceProps>(), {
  type: 'radio',
  cols: 1,
  shuffle: true,
  markerType: false
})

const activity = ref<InstanceType<typeof Activity>>()
const awnsers = ref<number[]|number|null>(null)
const options = ref<MultipleChoiceOption[]>([])

watch(awnsers, value => activity.value?.fill(value))

const prepare = () => {
  awnsers.value = null
  options.value = props.shuffle ? shuffle(props.options) : props.options
}

const check = () => {
  const selecteds = options.value.filter((option, index) => {
    return Array.isArray(awnsers.value)
      ? awnsers.value.includes(index)
      : awnsers.value === index
  })

  const totalPercentage = selecteds
    .map((selected) => selected.percentage)
    .reduce((previousPercentage, currentPercentage) => previousPercentage + currentPercentage, 0)

  const percentage = selecteds.length > 0 ? totalPercentage / selecteds.length : null

  activity.value?.store(percentage, selecteds)
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-multiple-choice"
    @prepare="prepare"
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
        v-model="awnsers"
        :marker-type="markerType"
        :position="index"
        :type="type"
        :label="option.label"
        :percentage="option.percentage"
      />
    </div>
  </Activity>
</template>
