<script setup lang="ts">
export type ResetsProps = {
  start?: number | string
  max?: number
  show?: boolean
}

export type ResetsParams = {
  used: number,
  remaining: number,
  isDead: boolean
}

export type ResetsEmits = {
  (e: 'increase', params: ResetsParams): void | Promise<void>
  (e: 'decrease', params: ResetsParams): void | Promise<void>
  (e: 'end', params: ResetsParams): void | Promise<void>
}

const emits = defineEmits<ResetsEmits>()

const props = withDefaults(defineProps<ResetsProps>(), {
  start: 0,
  max: 0,
  show: true
})

const used = typeof props.start === 'number'
  ? ref(props.start)
  : useStorage(props.start, 0)

const remaining = computed(() => props.max - used.value)
const isDead = computed(() => Boolean(props.max && remaining.value < 1))

watch(remaining, async () => {
  if (isDead.value) {
    await emits('end', {
      used: used.value,
      remaining: remaining.value,
      isDead: isDead.value
    })
  }
})

const increase = async () => {
  used.value++

  await emits('increase', {
    used: used.value,
    remaining: remaining.value,
    isDead: isDead.value
  })
}

const decrease = async () => {
  used.value--

  await emits('decrease', {
    used: used.value,
    remaining: remaining.value,
    isDead: isDead.value
  })
}

defineExpose({
  used,
  remaining,
  isDead,
  increase,
  decrease
})
</script>

<template>
  <slot
    v-if="show && max"
    :start="start"
    :max="max"
    :used="used"
    :remaining="remaining"
    :is-dead="isDead"
  >
    <div
      class="activity-resets"
      flex
      items-center
      justify-center
      text-red-500
      relative
    >
      <i
        class="activity-resets-icon"
        inline-block
        i-mdi-heart
        w-8
        h-8
      />
      <span
        class="activity-resets-text text-[.65rem]"
        absolute
        text-white
        v-text="remaining"
      />
    </div>
  </slot>
</template>
