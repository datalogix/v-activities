<script setup lang="ts">
import Activity from '../Activity.vue'
import Item from './Item.vue'
import Parser from './Parser.vue'
import Options from './Options.vue'
import type { DragAndDropParser } from './Parser.vue'

export interface DragAndDropItem {
  html: string
  file?: string
}

export interface DragAndDropProps {
  items: DragAndDropItem[]
  position?: 'top' | 'bottom' | 'both'
  enumerate?: boolean
  random?: boolean
}

export interface DragAndDropOption extends DragAndDropParser {
  id: string
  value: string
  selected?: DragAndDropOption
  related?: DragAndDropOption
}

const props = withDefaults(defineProps<DragAndDropProps>(), {
  position: 'top',
  enumerate: true,
  random: true
})

const activity = ref<InstanceType<typeof Activity>>()
const items = ref<DragAndDropItem[]>([])
const parsers = ref<InstanceType<typeof Parser>[]>([])
const options = ref<DragAndDropOption[]>([])
const availableOptions = computed(() => options.value.filter(option => option.related === undefined))

const prepare = () => {
  items.value = props.random ? shuffle(props.items) : props.items
  options.value = []

  nextTick(() => {
    parsers.value.forEach(parser => parser.clear())
    options.value = shuffle(options.value)
  })
}

const check = () => {
  activity.value?.calculateAndStore(
    options.value,
    options.value
      .filter(option => option.related !== undefined)
      .filter(option => compare(option.related?.value, option.selected?.related?.value)),
    options.value.length === availableOptions.value.length
  )
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-drag-and-drop"
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

    <Options
      v-if="availableOptions.length && (position === 'top' || position === 'both')"
      :options="availableOptions"
    />

    <div
      class="activity-drag-and-drop-items"
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
          :options="options"
          :html="html"
          @option="(option) => options.push(option)"
        />
      </Item>
    </div>

    <Options
      v-if="availableOptions.length && (position === 'bottom' || position === 'both')"
      :options="availableOptions"
    />
  </Activity>
</template>
