<script setup lang="ts">
export type TimerProps = {
  start?: number|string
  max?: number|string
  show?: boolean
  countdown?: boolean
}

export type TimerParams = {
  start: number
  max: number
  time: number
  formattedTime: string
  duration: number
  isFinished: boolean
}

export type TimerEmits = {
  (e: 'time', params: TimerParams): void | Promise<void>
  (e: 'play', params: TimerParams): void | Promise<void>
  (e: 'pause', params: TimerParams): void | Promise<void>
  (e: 'stop', params: TimerParams): void | Promise<void>
  (e: 'restart', params: TimerParams): void | Promise<void>
  (e: 'end', params: TimerParams): void | Promise<void>
}

const emits = defineEmits<TimerEmits>()

const props = withDefaults(defineProps<TimerProps>(), {
  start: 0,
  max: 0,
  show: true,
  countdown: false
})

const start = hmsToSeconds(props.start)
const max = hmsToSeconds(props.max)
const time = ref(props.countdown ? max - start : start)
const formattedTime = computed(() => formatSeconds(time.value))
const duration = computed(() => props.countdown ? max - time.value : time.value)
const isFinished = computed(() => {
  return Boolean(max && ((time.value >= max && !props.countdown) || (time.value < 1 && props.countdown)))
})

const interval = useIntervalFn(async () => {
  time.value = props.countdown ? time.value - 1 : time.value + 1

  await emits('time', {
    start,
    max,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })
}, 1000, { immediate: false })

watch(time, async () => {
  if (isFinished.value) {
    await pause()
    await emits('end', {
      start,
      max,
      time: time.value,
      formattedTime: formattedTime.value,
      duration: duration.value,
      isFinished: isFinished.value
    })
  }
})

const play = async () => {
  await emits('play', {
    start,
    max,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })

  interval.resume()
}

const pause = async () => {
  await emits('pause', {
    start,
    max,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })

  interval.pause()
}

const stop = async () => {
  await emits('stop', {
    start,
    max,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })

  await pause()

  time.value = props.countdown ? max : 0
}

const restart = async () => {
  await emits('restart', {
    start,
    max,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })

  await stop()
  await play()
}

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
    <slot
      :start="start"
      :max="max"
      :time="time"
      :formatted-time="formattedTime"
      :duration="duration"
      :is-finished="isFinished"
    >
      <i
        class="activity-timer-icon"
        i-mdi-clock-outline
        w-6
        h-6
      />
      <span
        class="activity-timer-text"
        font-semibold
        v-text="formattedTime"
      />
    </slot>
  </div>
</template>
