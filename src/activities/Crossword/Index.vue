<script setup lang="ts">
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
  activity.value?.calculateAndStore(
    props.items.filter(item => !item.fixed),
    props.items.filter(item => !item.fixed).filter(item => compare(item.word, grid.value?.getFilledWord(item))),
    props.items.filter(item => !item.fixed).every(item => grid.value?.isEmptyWord(item))
  )
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
      v-if="position === 'top' || position === 'both'"
      :tips="items.map(item => item.tip)"
      @select="selectByIndex"
    />

    <Grid
      ref="grid"
      my-4
      :items="items"
    />

    <Tips
      v-if="position === 'bottom' || position === 'both'"

      :tips="items.map(item => item.tip)"
      @select="selectByIndex"
    />
  </Activity>
</template>
