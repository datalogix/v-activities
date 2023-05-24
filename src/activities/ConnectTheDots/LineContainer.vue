<script setup lang="ts">
import arrowCreate from 'arrows-svg'
import type Item from './Item.vue'

export type ConnectTheDotsLineItem = InstanceType<typeof Item>

export type ConnectTheDotsLine = {
  element: typeof arrowCreate
  left: ConnectTheDotsLineItem
  right: ConnectTheDotsLineItem
  preview: boolean
}

const container = ref<HTMLDivElement>()
const lines = ref<ConnectTheDotsLine[]>([])

const clearIfExists = (left: ConnectTheDotsLineItem, right: ConnectTheDotsLineItem) => {
  lines.value
    .filter(line => !line.preview)
    .filter(line => line.left === left || line.right === right)
    .forEach(line => {
      line.left.clear()
      line.right.clear()
      line.element.clear()
    })

  lines.value = lines.value
    .filter(line => !line.preview)
    .filter(line => !(line.left === left || line.right === right))
}

const create = (left: ConnectTheDotsLineItem, right: ConnectTheDotsLineItem, preview = false): ConnectTheDotsLine => {
  clearIfExists(left, right)

  if (!preview) {
    left.select()
    right.select()
  }

  const line = {
    element: arrowCreate({
      className: preview ? 'arrow-preview' : 'arrow',
      from: {
        node: left.$el,
        translation: [0.5, 0, 0.5]
      },
      to: {
        node: right.$el,
        translation: [-0.5, 0, -0.5]
      }
    }),
    left,
    right,
    preview
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
.arrow__path,
.arrow-preview__path {
  stroke: #000000;
  fill: transparent;
  stroke-width: 4;
}

.arrow-preview__path {
  stroke: #e1e1e1 !important;
}
</style>