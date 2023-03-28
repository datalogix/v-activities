<script setup lang="ts">
import Timer from './Timer.vue'
import Lifes from './Lifes.vue'

const { instance, props, stop, check } = useActivity()
const timer = ref<InstanceType<typeof Timer>>()
const resets = ref<InstanceType<typeof Lifes>>()

const onTimerTime = (time: number) => instance.emit('timer-time', time)
const onTimerPlay = (time: number) => instance.emit('timer-play', time)
const onTimerPause = (time: number) => instance.emit('timer-pause', time)
const onTimerStop = (time: number) => instance.emit('timer-stop', time)
const onTimerRestart = (time: number) => instance.emit('timer-restart', time)
const onTimerEnd = async (time: number) => {
  await check()
  await instance.emit('timer-end', time)
}

const onResetsIncrease = (lifes: number) => instance.emit('resets-increase', lifes)
const onResetsDecrease = (lifes: number) => instance.emit('resets-decrease', lifes)
const onResetsEnd = async (lifes: number) => {
  await stop()
  await instance.emit('resets-end', lifes)
}

defineExpose({
  timer,
  resets
})
</script>

<template>
  <header
    class="activity-header"
    relative
    w-full
    container
    max-w-5xl
    flex
    justify-center
    items-center
    mx-auto
    z-10
  >
    <div
      flex
      bg-white
      gap-4
      px-4
      py-1
      rounded-t-xl
      shadow-inner
      items-center
      justify-center
    >
      <slot />

      <slot name="timer">
        <Timer
          ref="timer"
          :countdown="props.countdown"
          :start="props.startTime"
          :max="props.maxTime"
          :show="props.showTimer"
          @time="onTimerTime"
          @play="onTimerPlay"
          @pause="onTimerPause"
          @stop="onTimerStop"
          @restart="onTimerRestart"
          @end="onTimerEnd"
        />
      </slot>

      <slot name="resets">
        <Lifes
          ref="resets"
          :start="props.usedResets"
          :max="props.maxResets"
          :show="props.showResets"
          @increase="onResetsIncrease"
          @decrease="onResetsDecrease"
          @end="onResetsEnd"
        />
      </slot>
    </div>
  </header>
</template>
