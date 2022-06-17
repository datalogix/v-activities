<script setup lang="ts">
import { ref } from 'vue'
import { replace, shuffleStringUnique } from '@/utils/string'

export interface AssembleWordOptionsActions {
  word: string
  used: string[]
  right: string[]
  wrong: string[]
}

export interface AssembleWordOptionsProps {
  word: string
}

const props = defineProps<AssembleWordOptionsProps>()

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'right', params: AssembleWordOptionsActions): void
  (e: 'wrong', params: AssembleWordOptionsActions): void
}>()

const word = ref<string>(replace(props.word).toLocaleUpperCase())
const options = ref<string[]>([])
const used = ref<string[]>([])
const right = ref<string[]>([])
const wrong = ref<string[]>([])

const select = (option: string) => {
  if (word.value[used.value.length] !== option) {
    wrong.value.push(option)

    emits('wrong', {
      word: word.value,
      used: used.value,
      right: right.value,
      wrong: wrong.value
    })

    setTimeout(() => {
      wrong.value = []
    }, 500)

    return
  }

  used.value.push(option)
  right.value.push(option)

  emits('right', {
    word: word.value,
    used: used.value,
    right: right.value,
    wrong: wrong.value
  })

  setTimeout(() => {
    right.value = []
  }, 500)
}

const prepare = () => {
  options.value = shuffleStringUnique(word.value).split('')
  used.value = []
  right.value = []
  wrong.value = []
}

defineExpose({
  word,
  used,
  right,
  wrong,
  prepare
})

prepare()
</script>

<template>
  <div
    class="activity-assemble-word-options"
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
      class="activity-assemble-word-option"
      :class="{
        'bg-green-300 activity-assemble-word-option-right': right.includes(option),
        'bg-red-300 activity-assemble-word-option-wrong': wrong.includes(option)
      }"
      type="button"
      cursor-pointer
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
      @click="select(option)"
    >
      {{ option }}
    </Button>
  </div>
</template>
