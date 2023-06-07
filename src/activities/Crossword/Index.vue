<script setup lang="ts">
import Activity from '../Activity.vue'
import Grid from './Grid.vue'
import Tips from './Tips.vue'

export type CrosswordItem = {
  x: number
  y: number
  type: 'vertical' | 'horizontal'
  position: number
  word: string
  tip?: string
  fixed?: boolean
}

export type CrosswordProps = {
  position?: 'top' | 'bottom' | 'both'
  specialCharacters?: boolean
  items: CrosswordItem[]
}

export type CrosswordAnswer = {
  values: (string | undefined)[][]
}

const props = withDefaults(defineProps<CrosswordProps>(), {
  position: 'top',
  specialCharacters: false
})

const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<CrosswordAnswer>()
const grid = ref<InstanceType<typeof Grid>>()

const select = (item: CrosswordItem) => {
  grid.value?.select(item.x, item.y)
}

const update = () => {
  const empty = props.items
    .filter(item => !item.fixed)
    .every(item => grid.value?.isEmptyWord(item))

  if (empty) {
    activity.value?.blank()
  } else {
    activity.value?.filled()
  }

  answer.value!.values = grid.value!.values()
}

const start = () => {
  grid.value?.clear()
  answer.value = {
    values: grid.value!.values()
  }
}

const answered = (_answer: CrosswordAnswer) => {
  grid.value?.clear()
  grid.value?.answered(_answer)
}

const check = () => {
  const total = props.items.filter(item => !item.fixed).length
  const right = props.items
    .filter(item => !item.fixed)
    .filter(item => compare(item.word, grid.value!.getFilledWord(item), false, props.specialCharacters))
    .length

  return activity.value?.store({
    percentage: right ? (right * 100 / props.items.length) : 0,
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
    type="crossword"
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

    <Tips
      v-if="position === 'top' || position === 'both'"
      :items="items"
      @select="select"
    />

    <Grid
      ref="grid"
      my-4
      :items="items"
      @update="update"
    />

    <Tips
      v-if="position === 'bottom' || position === 'both'"
      :items="items"
      @select="select"
    />
  </Activity>
</template>
