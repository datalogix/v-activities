<script setup lang="ts">
import Activity from '../Activity.vue'
import Item from './Item.vue'
import Parser from './Parser.vue'
import type { FillInTheBlanksParser } from './Parser.vue'

export interface FillInTheBlanksItem {
  html: string
  file?: string
}

export interface FillInTheBlanksProps {
  items: FillInTheBlanksItem[]
  enumerate?: boolean
  random?: boolean
}

export interface FillInTheBlanksOption extends FillInTheBlanksParser {
  value: string
  correct: string
  options: string[]
}

const props = withDefaults(defineProps<FillInTheBlanksProps>(), {
  enumerate: true,
  random: true
})

const activity = ref<InstanceType<typeof Activity>>()
const items = ref<FillInTheBlanksItem[]>([])
const parsers = ref<InstanceType<typeof Parser>[]>([])
const options = ref<FillInTheBlanksOption[]>([])

const prepare = () => {
  items.value = props.random ? shuffle(props.items) : props.items
  options.value = []

  nextTick(() => {
    parsers.value.forEach(parser => parser.clear())
  })
}

const check = () => {
  activity.value?.calculateAndStore(
    options.value,
    options.value.filter(option => compare(option.value, option.correct)),
    options.value.every(option => option.value.trim() === '')
  )
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-fill-in-the-blanks"
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
      class="activity-fill-in-the-blanks-items"
      mx-auto
      max-w-2xl
    >
      <Item
        v-for="(item, index) in items"
        v-slot="{ html }"
        :key="index"
        :item="item"
        :position="enumerate ? index + 1 : undefined"
      >
        <Parser
          ref="parsers"
          :html="html"
          @option="(option) => options.push(option)"
        />
      </Item>
    </div>
  </Activity>
</template>
