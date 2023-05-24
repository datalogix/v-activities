<script setup lang="ts">
import type { HangmanAnswer } from './Index.vue'

export type HangmanItemsProps = {
  word: string
}

export type HangmanItemsEmits = {
  (e: 'right', params: HangmanAnswer): void
  (e: 'wrong', params: HangmanAnswer): void
}

const props = defineProps<HangmanItemsProps>()
const emits = defineEmits<HangmanItemsEmits>()
const activity = useActivity()
const MAX_ITEMS = 20
const unique = ref<string[]>(Array.from(new Set(replace(props.word, '', { space: false }).toLocaleUpperCase().split(''))))
const items = ref<string[]>([])
const used = ref<string[]>([])
const right = ref<string[]>([])
const wrong = ref<string[]>([])

const isDisabled = (item: string) => {
  return used.value.includes(item)
}

const select = (item: string) => {
  if (isDisabled(item) || activity.props.mode === 'answered') {
    return
  }

  if (!used.value.includes(item)) {
    used.value.push(item)
  }

  if (!unique.value.includes(item)) {
    if (!wrong.value.includes(item)) {
      wrong.value.push(item)

      emits('wrong', {
        items: items.value,
        unique: unique.value,
        used: used.value,
        right: right.value,
        wrong: wrong.value
      })
    }
    return
  }

  if (!right.value.includes(item)) {
    right.value.push(item)

    emits('right', {
      items: items.value,
      unique: unique.value,
      used: used.value,
      right: right.value,
      wrong: wrong.value
    })
  }
}

const start = () => {
  items.value = shuffle(generateUniqueStringFromString(unique.value.join(''), MAX_ITEMS).split(''))
  used.value = []
  right.value = []
  wrong.value = []
}

const answered = (answer: HangmanAnswer) => {
  items.value = answer.items
  unique.value = answer.unique
  used.value = answer.used
  right.value = answer.right
  wrong.value = answer.wrong
}

defineExpose({
  items,
  unique,
  used,
  right,
  wrong,
  start,
  answered
})
</script>

<template>
  <transition-group
    class="activity-hangman-items"
    tag="div"
    max-w-2xl
    flex
    justify-center
    flex-wrap
    gap-2
    mx-auto
  >
    <button
      v-for="item in items"
      :key="item"
      :disabled="isDisabled(item)"
      class="activity-hangman-item"
      :class="{
        'activity-hangman-item-disabled': isDisabled(item),
        'activity-hangman-item-enabled': !isDisabled(item),
        '!cursor-not-allowed': activity.props.mode === 'answered',
        'hover:bg-blue-300': activity.props.mode !== 'answered'
      }"
      type="button"
      cursor-pointer
      outline-none
      rounded
      border
      border-solid
      uppercase
      text-base
      md:text-xl
      lg:text-2xl
      text-center
      w-10
      h-10
      md:w-12
      md:h-12
      lg:w-14
      lg:h-14
      transition-all
      disabled:bg-gray-300
      disabled:hover:bg-gray-300
      disabled:cursor-not-allowed
      @click="select(item)"
    >
      {{ item }}
    </button>
  </transition-group>
</template>
