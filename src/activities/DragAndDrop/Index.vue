<script setup lang="ts">
import { ref } from 'vue'
import Activity from '../Activity.vue'
import Content from './Content.vue'
import Options from './Options.vue'

export interface DragAndDropProps {
  text: string
  position?: 'top' | 'bottom' | 'both'
}

const props = withDefaults(defineProps<DragAndDropProps>(), {
  position: 'top'
})

const activity = ref<InstanceType<typeof Activity>>()
const content = ref<InstanceType<typeof Content>>()

const prepare = () => {
  content.value?.clear()
}

const check = () => {
  if (!content.value) return

  const isEmpty = content.value.options.length === content.value.availableOptions.length

  const totalRight = content.value.options
    .filter(option => option.related !== undefined)
    .filter(option => option.related?.value === option.selected?.related?.value)
    .length

  const percentage = totalRight * 100 / content.value.options.length
  activity.value?.store(isEmpty ? null : percentage, content.value.options)
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
      v-if="content?.availableOptions.length && (props.position === 'top' || props.position === 'both')"
      :options="content?.availableOptions"
      border-b
    />

    <Content
      ref="content"
      :text="props.text"
      mx-auto
      my-10
    />

    <Options
      v-if="content?.availableOptions.length && (props.position === 'bottom' || props.position === 'both')"
      :options="content?.availableOptions"
      border-t
    />
  </Activity>
</template>
