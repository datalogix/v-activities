<script setup lang="ts">
import Timer, { type TimerParams } from './Timer.vue'
import Resets, { type ResetsParams } from './Resets.vue'

const { instance, props, openMessage, dead, check, finish, exit } = useActivity()
const globalTimer = ref<InstanceType<typeof Timer>>()
const timer = ref<InstanceType<typeof Timer>>()
const resets = ref<InstanceType<typeof Resets>>()

const globalTimerTime = (params: TimerParams) => instance.emit('global-timer-time', params)
const globalTimerPlay = (params: TimerParams) => instance.emit('global-timer-play', params)
const globalTimerPause = (params: TimerParams) => instance.emit('global-timer-pause', params)
const globalTimerStop = (params: TimerParams) => instance.emit('global-timer-stop', params)
const globalTimerRestart = (params: TimerParams) => instance.emit('global-timer-restart', params)
const globalTimerEnd = async (params: TimerParams) => {
  await finish(true)
  await instance.emit('global-timer-end', params)
}

const timerTime = (params: TimerParams) => instance.emit('timer-time', params)
const timerPlay = (params: TimerParams) => instance.emit('timer-play', params)
const timerPause = (params: TimerParams) => instance.emit('timer-pause', params)
const timerStop = (params: TimerParams) => instance.emit('timer-stop', params)
const timerRestart = (params: TimerParams) => instance.emit('timer-restart', params)
const timerEnd = async (params: TimerParams) => {
  await check()
  await instance.emit('timer-end', params)
}

const resetsIncrease = (params: ResetsParams) => instance.emit('resets-increase', params)
const resetsDecrease = (params: ResetsParams) => instance.emit('resets-decrease', params)
const resetsEnd = async (params: ResetsParams) => {
  await dead()
  await instance.emit('resets-end', params)
}

defineExpose({
  globalTimer,
  timer,
  resets
})
</script>

<template>
  <header
    class="activity-header"
    relative
    container
    max-w-5xl
    w-full
    z-30
    mx-auto
    flex
    justify-center
    items-center
  >
    <div
      flex
      gap-4
      px-4
      py-1
      rounded-t-xl
      shadow-inner
      items-center
      justify-center
    >
      <slot />

      <div
        v-show="props.globalShowTimer || props.showTimer"
        flex
        flex-col
        items-center
      >
        <slot name="global-timer">
          <Timer
            ref="globalTimer"
            :start="props.globalStartTime"
            :max="props.globalMaxTime"
            :show="props.globalShowTimer"
            :countdown="props.globalCountdown"
            @time="globalTimerTime"
            @play="globalTimerPlay"
            @pause="globalTimerPause"
            @stop="globalTimerStop"
            @restart="globalTimerRestart"
            @end="globalTimerEnd"
          />
        </slot>

        <slot name="timer">
          <Timer
            ref="timer"
            :start="props.startTime"
            :max="props.maxTime"
            :show="props.showTimer"
            :countdown="props.countdown"
            @time="timerTime"
            @play="timerPlay"
            @pause="timerPause"
            @stop="timerStop"
            @restart="timerRestart"
            @end="timerEnd"
          >
            <template
              v-if="props.globalShowTimer"
              #default="{ formattedTime }"
            >
              <span
                ml-8
                text-xs
                v-text="formattedTime"
              />
            </template>
          </Timer>
        </slot>
      </div>

      <slot name="resets">
        <Resets
          ref="resets"
          :start="props.usedResets"
          :max="props.maxResets"
          :show="props.showResets"
          @increase="resetsIncrease"
          @decrease="resetsDecrease"
          @end="resetsEnd"
        />
      </slot>

      <slot
        v-if="props.instructions"
        name="instructions"
      >
        <button
          type="button"
          class="activity-button-instructions"
          text-blue
          bg-white
          flex
          items-center
          justify-center
          hover:opacity-70
          @click="openMessage({ type: 'info', content: String(props.instructions) })"
        >
          <i
            class="activity-button-instructions-icon"
            i-mdi-info
            w-8
            h-8
          />
        </button>
      </slot>

      <slot
        v-if="props.canExit"
        name="close"
      >
        <button
          type="button"
          class="activity-button-close"
          cursor-pointer
          border-none
          outline-none
          rounded-full
          text-white
          bg-black
          flex
          items-center
          justify-center
          p-1
          hover:opacity-70
          @click="exit()"
        >
          <i
            class="activity-button-close-icon"
            i-mdi-close
            w-4
            h-4
          />
        </button>
      </slot>
    </div>
  </header>
</template>
