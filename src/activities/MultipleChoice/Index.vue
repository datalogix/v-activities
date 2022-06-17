<script setup lang="ts">
import { ref } from 'vue'
import shuffle from 'lodash.shuffle'
import Activity from '../Activity.vue'

export interface MultipleChoiceOption {
  label: string
  percentage: number
}

export interface MultipleChoiceProps {
  options: MultipleChoiceOption[]
  type?: 'checkbox' | 'radio'
  cols?: number
  shuffle?: boolean
}

const props = withDefaults(defineProps<MultipleChoiceProps>(), {
  type: 'radio',
  cols: 1,
  shuffle: true
})

const activity = ref<InstanceType<typeof Activity>>()
const awnsers = ref<number[]|null>([])
const options = ref<MultipleChoiceOption[]>([])

const prepare = () => {
  awnsers.value = []
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

    <ul
      class="activity-multiple-choice-options"
      :class="`activity-multiple-choice-options-cols-${props.cols}`"
      m-0
      p-0
      list-none
      grid
      grid-cols-1
      gap-4
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        class="activity-multiple-choice-option"
        flex
        items-center
        gap-2
        mx-auto
      >
        <input
          :id="`awnser${index}`"
          v-model="awnsers"
          class="activity-multiple-choice-option-input"
          :type="props.type"
          :value="index"
        >
        <label
          class="activity-multiple-choice-option-label"
          flex-1
          text-xl
          :for="`awnser${index}`"
          v-html="option.label"
        />
      </li>
    </ul>
  </Activity>
</template>

<style scoped>
@media (min-width: 1024px) {
  .activity-multiple-choice-options-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
  .activity-multiple-choice-options-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
}
</style>
