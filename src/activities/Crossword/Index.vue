<script setup lang="ts">
import { ref } from 'vue'
import Activity from '../Activity.vue'
import Grid from './Grid.vue'
import type { CrosswordItem } from './Grid.vue'
import Tips from './Tips.vue'

export interface CrosswordProps {
  position?: 'top' | 'bottom' | 'both'
  items: CrosswordItem[]
}

const props = withDefaults(defineProps<CrosswordProps>(), {
  position: 'top'
})

const activity = ref<InstanceType<typeof Activity>>()
const grid = ref<InstanceType<typeof Grid>>()

const selectByIndex = (index: number) => {
  grid.value?.select(props.items[index].x, props.items[index].y)
}

const prepare = () => {
  grid.value?.clear()
}

const check = () => {
  const items = props.items.filter(item => !item.fixed)
  const isEmpty = items.every(item => grid.value?.isEmptyWord(item))
  const rights = items.filter(item => {
    return item.word.toLocaleUpperCase() === grid.value?.getFilledWord(item).toLocaleUpperCase()
  })

  const percentage = rights.length * 100 / items.length
  activity.value?.store(isEmpty ? null : percentage, { items, rights })
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-crossword"
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

    <Tips
      v-if="props.position === 'top' || props.position === 'both'"
      :tips="props.items.map(item => item.tip)"
      @select="selectByIndex"
    />

    <Grid
      ref="grid"
      my-10
      :items="props.items"
    />

    <Tips
      v-if="props.position === 'bottom' || props.position === 'both'"

      :tips="props.items.map(item => item.tip)"
      @select="selectByIndex"
    />
  </Activity>
</template>
