<script setup lang="ts">
export interface TimerProps {
  countdown?: boolean
  start?: number|string
  max?: number|string
  show?: boolean
}

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'time', time: number): void | Promise<void>
  (e: 'play', time: number): void | Promise<void>
  (e: 'pause', time: number): void | Promise<void>
  (e: 'stop', time: number): void | Promise<void>
  (e: 'restart', time: number): void | Promise<void>
  (e: 'end', time: number): void | Promise<void>
}>()

const props = withDefaults(defineProps<TimerProps>(), {
  countdown: false,
  start: 0,
  max: 0,
  show: true
})

const start = hmsToSeconds(props.start)
const max = hmsToSeconds(props.max)
const time = ref(props.countdown ? max - start : start)
const interval = useIntervalFn(async () => {
  time.value = props.countdown ? time.value - 1 : time.value + 1

  await emits('time', time.value)
}, 1000, { immediate: false })

const isFinished = computed(() => {
  return max && ((time.value >= max && !props.countdown) || (time.value < 1 && props.countdown))
})

const formattedTime = computed(() => formatSeconds(time.value))

watch(time, async (value) => {
  if (isFinished.value) {
    await pause()
    await emits('end', value)
  }
})

const play = async () => {
  await emits('play', time.value)

  interval.resume()
}

const pause = async () => {
  await emits('pause', time.value)

  interval.pause()
}

const stop = async () => {
  await emits('stop', time.value)
  await pause()

  time.value = props.countdown ? max : 0
}

const restart = async () => {
  await emits('restart', time.value)
  await stop()
  await play()
}

const duration = computed(() => {
  return props.countdown ? max - time.value : time.value
})

defineExpose({
  play,
  pause,
  stop,
  restart,
  time,
  duration,
  isFinished,
  formattedTime
})
</script>

<template>
  <div
    v-if="show"
    class="activity-timer"
    flex
    items-center
    justify-center
    space-x-2
  >
    <i
      class="activity-timer-icon"
      i-mdi-clock-outline
      w-6
      h-6
    />
    <div
      flex
      flex-col
      items-center
      justify-center
    >
      <slot
        :time="time"
        :duration="duration"
        :formatted-time="formattedTime"
      >
        <span
          class="activity-timer-text"
          font-semibold
          v-text="formattedTime"
        />
      </slot>
    </div>
  </div>
</template>
