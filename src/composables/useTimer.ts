export function useTimer (startTime: number|string = 0, maxTime: number|string = 0, countdown = false) {
  const emit = useEmit()
  const start = hmsToSeconds(startTime)
  const max = hmsToSeconds(maxTime)
  const time = ref(countdown ? max - start : start)
  const interval = useIntervalFn(async () => {
    time.value = countdown ? time.value - 1 : time.value + 1

    await emit('time', time.value)
  }, 1000, { immediate: false })

  watch(time, async (value) => {
    if (max && ((value >= max && !countdown) || (value < 1 && countdown))) {
      await pause()
      await emit('end', value)
    }
  })

  const play = async () => {
    await emit('play', time.value)
    interval.resume()
  }

  const pause = async () => {
    await emit('pause', time.value)
    interval.pause()
  }

  const stop = async () => {
    await emit('stop', time.value)
    await pause()
    time.value = countdown ? max : 0
  }

  const restart = async () => {
    await emit('restart', time.value)
    await stop()
    await play()
  }

  const duration = computed(() => {
    return countdown ? max - time.value : time.value
  })

  const format = (value: number|null = null) => {
    return formatSeconds(value === null ? time.value : value)
  }

  return {
    play,
    pause,
    stop,
    restart,
    time,
    duration,
    format
  }
}
