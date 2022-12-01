<script setup lang="ts">
export interface HangmanOptionsActions {
  unique: string[]
  used: string[]
  right: string[]
  wrong: string[]
}

export interface HangmanOptionsProps {
  word: string
}

const props = defineProps<HangmanOptionsProps>()

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'right', params: HangmanOptionsActions): void
  (e: 'wrong', params: HangmanOptionsActions): void
}>()

const MAX_OPTIONS = 20
const unique = ref<string[]>(Array.from(new Set(replace(props.word, '', { space: false }).toLocaleUpperCase().split(''))))
const options = ref<string[]>([])
const used = ref<string[]>([])
const right = ref<string[]>([])
const wrong = ref<string[]>([])

const select = (option: string) => {
  if (!used.value.includes(option)) {
    used.value.push(option)
  }

  if (!unique.value.includes(option)) {
    if (!wrong.value.includes(option)) {
      wrong.value.push(option)

      emits('wrong', {
        unique: unique.value,
        used: used.value,
        right: right.value,
        wrong: wrong.value
      })
    }
    return
  }

  if (!right.value.includes(option)) {
    right.value.push(option)

    emits('right', {
      unique: unique.value,
      used: used.value,
      right: right.value,
      wrong: wrong.value
    })
  }
}

const prepare = () => {
  options.value = shuffle(generateUniqueStringFromString(unique.value.join(''), MAX_OPTIONS).split(''))
  used.value = []
  right.value = []
  wrong.value = []
}

defineExpose({
  unique,
  used,
  right,
  wrong,
  prepare
})

prepare()
</script>

<template>
  <transition-group
    class="activity-hangman-options"
    tag="div"
    max-w-2xl
    flex
    justify-center
    flex-wrap
    gap-2
    mx-auto
  >
    <Button
      v-for="option in options"
      :key="option"
      class="activity-hangman-option"
      :class="{
        'cursor-not-allowed activity-hangman-option-disabled': used.includes(option),
        'cursor-pointer activity-hangman-option-enabled': !used.includes(option)
      }"
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
      :disabled="used.includes(option)"
      @click="select(option)"
    >
      {{ option }}
    </Button>
  </transition-group>
</template>
