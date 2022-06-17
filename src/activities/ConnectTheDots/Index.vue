<script setup lang="ts">
import { ref } from 'vue'
import Activity from '../Activity.vue'
import LineContainer from './LineContainer.vue'
import type { ConnectTheDotsLine } from './LineContainer.vue'
import Options from './Options.vue'

export type ConnectTheDotsOption = {
  value: string
  related: string
}

export interface ConnectTheDotsProps {
  options: Record<string, string>
}

const props = defineProps<ConnectTheDotsProps>()
const activity = ref<InstanceType<typeof Activity>>()
const lineContainer = ref<InstanceType<typeof LineContainer>>()
const optionsLeft = ref<InstanceType<typeof Options>>()
const optionsRight = ref<InstanceType<typeof Options>>()
const left = ref<ConnectTheDotsOption[]>([])
const right = ref<ConnectTheDotsOption[]>([])

for (const key in props.options) {
  left.value.push({ value: key, related: props.options[key] })
  right.value.push({ value: props.options[key], related: key })
}

const createLine = () => {
  if (
    !lineContainer.value ||
    !optionsLeft.value?.selected ||
    !optionsRight.value?.selected
  ) {
    return
  }

  lineContainer.value.create(
    optionsLeft.value.selected,
    optionsRight.value.selected
  )

  optionsLeft.value.selected = undefined
  optionsRight.value.selected = undefined
}

const prepare = () => {
  lineContainer.value?.clear()
  optionsLeft.value?.clear()
  optionsRight.value?.clear()
}

const check = () => {
  if (!lineContainer.value) return

  const isEmpty = lineContainer.value.lines.length === 0

  const totalRight = lineContainer.value.lines
    .filter((line: ConnectTheDotsLine) => line.left.option.value === line.right.option.related)
    .length

  const percentage = (totalRight || 0) * 100 / left.value.length
  activity.value?.store(isEmpty ? null : percentage, lineContainer.value.lines)
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-connect-the-dots"
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

    <LineContainer ref="lineContainer">
      <div
        class="activity-connect-the-dots-container"
        relative
        flex
        justify-center
      >
        <Options
          ref="optionsLeft"
          :options="left"
          type="left"
          @select="createLine"
        />

        <div
          class="activity-connect-the-dots-space"
          w-40
          md:w-80
          lg:w-120
        />

        <Options
          ref="optionsRight"
          :options="right"
          type="right"
          @select="createLine"
        />
      </div>
    </LineContainer>
  </Activity>
</template>
