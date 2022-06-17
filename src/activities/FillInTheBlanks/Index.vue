<script setup lang="ts">
import { ref } from 'vue'
import Activity from '../Activity.vue'
import Content from './Content.vue'

export interface FillInTheBlanksProps {
  text: string
}

const props = defineProps<FillInTheBlanksProps>()
const activity = ref<InstanceType<typeof Activity>>()
const content = ref<InstanceType<typeof Content>>()

const prepare = () => {
  content.value?.clear()
}

const check = () => {
  if (!content.value) return

  const isEmpty = content.value.options.every(option => option.value?.trim() === '')
  const totalRight = content.value.options.filter(option => option.value === option.correct).length
  const percentage = totalRight * 100 / content.value.options.length

  activity.value?.store(isEmpty ? null : percentage, content.value.options)
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

    <Content
      ref="content"
      :text="props.text"
      mx-auto
    />
  </Activity>
</template>
