<script setup lang="ts">
import Activity from '../Activity.vue'
import LineContainer from './LineContainer.vue'
import Items from './Items.vue'

export type ConnectTheDotsItem = {
  value: File | URL | string
  related: File | URL | string
}

export type ConnectTheDotsAnswer = {
  left: ConnectTheDotsItem[]
  right: ConnectTheDotsItem[]
  selecteds: {
    left: ConnectTheDotsItem
    right: ConnectTheDotsItem
  }[]
}

export type ConnectTheDotsProps = {
  items: ConnectTheDotsItem[]
}

const props = defineProps<ConnectTheDotsProps>()
const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<ConnectTheDotsAnswer>()
const lineContainer = ref<InstanceType<typeof LineContainer>>()
const itemsLeft = ref<InstanceType<typeof Items>>()
const itemsRight = ref<InstanceType<typeof Items>>()
const left = ref<ConnectTheDotsItem[]>(props.items.map(item => ({ value: item.value, related: item.related })))
const right = ref<ConnectTheDotsItem[]>(props.items.map(item => ({ value: item.related, related: item.value })))

const select = () => {
  if (
    !lineContainer.value ||
    !itemsLeft.value?.selected ||
    !itemsRight.value?.selected
  ) {
    return
  }

  activity.value?.filled()

  lineContainer.value.create(
    itemsLeft.value.selected,
    itemsRight.value.selected
  )

  answer.value!.selecteds = lineContainer.value.lines.map(line => ({
    left: line.left.item,
    right: line.left.item
  }))

  itemsLeft.value.selected = undefined
  itemsRight.value.selected = undefined
}

const start = () => {
  lineContainer.value?.clear()
  itemsLeft.value?.clear()
  itemsRight.value?.clear()

  answer.value = {
    left: itemsLeft.value?.items ?? [],
    right: itemsRight.value?.items ?? [],
    selecteds: []
  }

  if (activity.value?.props.mode === 'preview') {
    setTimeout(() => {
      props.items.forEach(item => {
        const itemLeft = itemsLeft.value?.find({ value: item.value, related: item.related })
        const itemRight = itemsRight.value?.find({ value: item.related, related: item.value })

        if (itemLeft && itemRight) {
          lineContainer.value?.create(itemLeft, itemRight, true)
        }
      })
    }, 200)
  }
}

const answered = (_answer: ConnectTheDotsAnswer) => {
  itemsLeft.value?.answered(_answer.left)
  itemsRight.value?.answered(_answer.right)

  setTimeout(() => {
    _answer.selecteds.forEach(selected => {
      const itemLeft = itemsLeft.value?.find(selected.left)
      const itemRight = itemsRight.value?.find(selected.right)

      if (itemLeft && itemRight) {
        lineContainer.value?.create(itemLeft, itemRight)
      }
    })
  }, 200)
}

const check = () => {
  const total = props.items.length
  const right = lineContainer.value!.lines
    .filter((line) => compare(line.left.item.value, line.right.item.related))
    .length

  lineContainer.value?.clear()

  return activity.value?.store({
    percentage: right ? (right * 100 / total) : 0,
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
    type="connect-the-dots"
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

    <LineContainer ref="lineContainer">
      <div
        class="activity-connect-the-dots-container"
        relative
        flex
        justify-center
        mx-0
        md:mx-4
      >
        <Items
          ref="itemsLeft"
          :items="left"
          type="left"
          @select="select"
        />

        <div
          class="activity-connect-the-dots-space"
          flex-1
        />

        <Items
          ref="itemsRight"
          :items="right"
          type="right"
          @select="select"
        />
      </div>
    </LineContainer>
  </Activity>
</template>
