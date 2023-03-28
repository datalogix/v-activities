<script setup lang="ts">
export interface LifesProps {
  start?: number
  max?: number
  show?: boolean
}

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'increase', lifes: number): void | Promise<void>
  (e: 'decrease', lifes: number): void | Promise<void>
  (e: 'end', lifes: number): void | Promise<void>
}>()

const props = withDefaults(defineProps<LifesProps>(), {
  start: 0,
  max: 0,
  show: true
})

const used = ref(props.start)
const lifes = computed(() => props.max - used.value)

watch(lifes, async (value) => {
  if (props.max && value <= 1) {
    await emits('end', value)
  }
})

const increase = async () => {
  used.value++

  await emits('increase', lifes.value)
}

const decrease = async () => {
  used.value--

  await emits('decrease', lifes.value)
}

defineExpose({
  lifes,
  used,
  increase,
  decrease
})
</script>

<template>
  <slot
    v-if="show && max"
    :lifes="lifes"
    :used="used"
  >
    <div
      class="activity-lifes"
      flex
      items-center
      justify-center
      text-red-500
      relative
    >
      <i
        class="activity-lifes-icon"
        inline-block
        i-mdi-heart
        w-8
        h-8
      />
      <span
        class="activity-lifes-text text-[.65rem]"
        absolute
        text-white
        v-text="lifes"
      />
    </div>
  </slot>
</template>
