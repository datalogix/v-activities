import { computed, getCurrentInstance, ref, watch, type ComponentInternalInstance } from 'vue'

export function useTimer (max = 0, countdown = false) {
  const { emit } = getCurrentInstance() as ComponentInternalInstance
  let i: NodeJS.Timer|null = null
  const time = ref(countdown ? max : 0)

  watch(time, async (value) => {
    if (max && ((value >= max && !countdown) || (value < 1 && countdown))) {
      await pause()
      await emit('end', value)
    }
  })

  const play = async () => {
    await emit('play', time.value)

    i = setInterval(async () => {
      time.value = countdown ? time.value - 1 : time.value + 1

      await emit('time', time.value)
    }, 1000)
  }

  const pause = async () => {
    await emit('pause', time.value)

    i && clearInterval(i)
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
    return new Date((value === null ? time.value : value) * 1000).toISOString().substring(14, 19)
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
