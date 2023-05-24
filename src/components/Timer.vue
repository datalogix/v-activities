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

const startSeconds = hmsToSeconds(props.start)
const maxSeconds = hmsToSeconds(props.max)
const time = ref(props.countdown ? maxSeconds - startSeconds : startSeconds)
const formattedTime = computed(() => formatSeconds(time.value))
const duration = computed(() => props.countdown ? maxSeconds - time.value : time.value)
const isFinished = computed(() => {
  return Boolean(maxSeconds && ((time.value >= maxSeconds && !props.countdown) || (time.value < 1 && props.countdown)))
})

const interval = useIntervalFn(async () => {
  time.value = props.countdown ? time.value - 1 : time.value + 1

  await emits('time', {
    start: startSeconds,
    max: maxSeconds,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })
}, 1000, { immediate: false })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emit = (event: any) => {
  return emits(event, {
    start: startSeconds,
    max: maxSeconds,
    time: time.value,
    formattedTime: formattedTime.value,
    duration: duration.value,
    isFinished: isFinished.value
  })
}

watch(time, async () => {
  if (isFinished.value) {
    await pause()
    await emit('end')
  }
})

const play = async () => {
  await emit('play')

  interval.resume()
}

const pause = async () => {
  await emit('pause')

  interval.pause()
}

const stop = async () => {
  await emit('stop')
  await pause()

  time.value = props.countdown ? maxSeconds : 0
}

const restart = async () => {
  await emit('restart')
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
      :start="startSeconds"
      :max="maxSeconds"
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
