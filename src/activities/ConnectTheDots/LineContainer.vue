<script setup lang="ts">
import { ref } from 'vue'
import arrowCreate from 'arrows-svg'
import type Option from './Option.vue'

export type ConnectTheDotsLine = {
  element: typeof arrowCreate
  left: InstanceType<typeof Option>
  right: InstanceType<typeof Option>
}

const container = ref<HTMLDivElement>()
const lines = ref<ConnectTheDotsLine[]>([])

const clearIfExists = (left: InstanceType<typeof Option>, right: InstanceType<typeof Option>) => {
  lines.value
    .filter(line => line.left === left || line.right === right)
    .forEach(line => {
      line.left.clear()
      line.right.clear()
      line.element.clear()
    })

  lines.value = lines.value.filter(line => !(line.left === left || line.right === right))
}

const create = (left: InstanceType<typeof Option>, right: InstanceType<typeof Option>): ConnectTheDotsLine => {
  clearIfExists(left, right)

  left.select()
  right.select()

  const line = {
    element: arrowCreate({
      from: left.$el,
      to: right.$el
    }),
    left,
    right
  }

  lines.value.push(line)

  container.value?.appendChild(line.element.node)

  return line
}

const clear = () => {
  lines.value.forEach(line => {
    line.left.clear()
    line.right.clear()
    line.element.clear()
  })

  lines.value = []
}

defineExpose({
  lines,
  create,
  clear
})
</script>

<template>
  <div
    ref="container"
    class="activity-connect-the-dots-line-container"
  >
    <slot />
  </div>
</template>

<style>
.arrow__path {
  stroke: #000;
  fill: transparent;
  stroke-width: 4;
}
</style>
