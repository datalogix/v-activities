<script setup lang="ts">
export type MarkerType = 'none' | 'number' | 'letter' | 'letter_uppercase'

export type MarkerProps = {
  type: MarkerType
  position: number
}

const props = defineProps<MarkerProps>()
const activity = useActivity()
const text = computed(() => {
  if (props.type === 'none') {
    return false
  }

  if (props.type === 'letter') {
    return `${LETTERS[props.position].toLocaleLowerCase()}`
  }

  if (props.type === 'letter_uppercase') {
    return `${LETTERS[props.position].toLocaleUpperCase()}`
  }

  return `${props.position + 1}`
})
</script>

<template>
  <span
    v-if="text"
    class="activity-marker"
    :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
    text-sm
    md:text-base
    lg:text-lg
    font-semibold
    bg-blue-300
    text-white
    rounded-full
    w-8
    h-8
    lg:w-10
    lg:h-10
    flex
    items-center
    justify-center
    absolute
    top--4
    lg:top--5
    left-4
    v-text="text"
  />
</template>
