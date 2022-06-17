<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useLoader, useMedia, useResets, useStatus, useTimer } from '@/composables'

export interface ActivityProps {
  statement?: string
  background?: string
  load?: string[]
  countdown?: boolean
  maxTimer?: number
  maxResets?: number
  displayMessage?: boolean
  displayTimer?: boolean
  displayResets?: boolean
  displayClose?:boolean
  displayTryAgain?: boolean
  displayCheck?: boolean
  displayExit?: boolean
}

export interface ActivityStoreParams extends ActivityProps {
  duration: number
  time: string
  resets: number
  percentage: number|null
  selecteds: unknown
}

const props = withDefaults(defineProps<ActivityProps>(), {
  statement: undefined,
  background: undefined,
  load: () => [],
  countdown: false,
  maxTimer: 0,
  maxResets: 3,
  displayMessage: true,
  displayTimer: true,
  displayResets: true,
  displayClose: true,
  displayTryAgain: true,
  displayCheck: true,
  displayExit: true
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  // actions
  (e: 'init'): Promise<void>
  (e: 'prepare'): Promise<void>
  (e: 'close', time: number): Promise<void>
  (e: 'tryAgain', resets: number): Promise<void>
  (e: 'check', time: number): Promise<void>
  (e: 'confirm'): Promise<void>
  (e: 'cancel'): Promise<void>
  (e: 'store', params: ActivityStoreParams): Promise<void>
  (e: 'exit', time: number): Promise<void>

  // status
  (e: 'loading'): Promise<void>
  (e: 'alive'): Promise<void>
  (e: 'death'): Promise<void>
  (e: 'success'): Promise<void>
  (e: 'error'): Promise<void>

  // timer
  (e: 'time', time: number): Promise<void>
  (e: 'play', time: number): Promise<void>
  (e: 'pause', time: number): Promise<void>
  (e: 'stop', time: number): Promise<void>
  (e: 'restart', time: number): Promise<void>
  (e: 'end', time: number): Promise<void>
}>()

const loader = useLoader((props.background ? [props.background] : []).concat(...props.load))
const media = useMedia()
const resets = useResets(props.maxResets)
const status = useStatus()
const timer = useTimer(props.maxTimer, props.countdown)

status.loading()

onMounted(async () => {
  await loader.start()

  media.load()

  await emits('init')
  await emits('prepare')

  await status.alive()
  await timer.play()
})

watchEffect(async () => {
  if (props.maxResets && resets.lifes.value < 1) {
    media.stop()

    await timer.stop()
    await status.death()
  }
})

const close = async () => {
  media.stop()

  await timer.pause()

  await emits('close', timer.time.value)
}

const tryAgain = async () => {
  if (status.isDeath()) return

  resets.increase()
  media.stop()

  await status.alive()
  await timer.restart()

  await emits('prepare')
  await emits('tryAgain', resets.count.value)
}

const check = async () => {
  if (!status.isAlive()) return

  media.stop()

  await emits('check', timer.time.value)
}

const store = async (percentage: number|null = null, selecteds: unknown = {}) => {
  media.stop()

  if (percentage === null) {
    return await status.confirm()
  }

  await execute(percentage, selecteds)
}

const execute = async (percentage: number|null = null, selecteds: unknown = {}) => {
  await timer.pause()

  if (props.displayMessage && percentage !== null) {
    percentage === 0 ? await status.error() : await status.success()
  } else {
    await status.loading()
  }

  await emits('store', {
    ...props,
    duration: timer.duration.value,
    time: timer.format(timer.duration.value),
    resets: resets.count.value,
    percentage,
    selecteds
  })
}

const exit = async () => {
  media.stop()

  await timer.pause()
  await emits('exit', timer.time.value)
}

defineExpose({
  ...status,
  loader,
  media,
  timer,
  resets,
  close,
  tryAgain,
  check,
  store,
  exit
})
</script>

<template>
  <section
    class="activity"
    bg-center-center
    bg-no-repeat
    bg-cover
    w-full
    h-screen
    flex
    flex-col
    relative
    :style="props.background && { 'background-image': `url(${props.background})` }"
  >
    <slot
      v-if="status.isLoading()"
      name="activity-status-loading"
    >
      <StatusLoading />
    </slot>
    <slot
      v-if="status.isDeath()"
      name="activity-status-death"
    >
      <StatusDeath />
    </slot>
    <slot
      v-if="status.isSuccess()"
      name="activity-status-success"
    >
      <StatusSuccess />
    </slot>
    <slot
      v-if="status.isError()"
      name="activity-status-error"
    >
      <StatusError />
    </slot>
    <slot
      v-if="status.isConfirm()"
      name="activity-status-confirm"
    >
      <StatusConfirm
        @confirm="execute"
        @cancel="status.alive()"
      />
    </slot>
    <slot name="activity-header">
      <header
        class="activity-header"
        w-full
        container
        max-w-5xl
        flex
        justify-center
        items-center
        mx-auto
        mt-8
        z-10
      >
        <div
          flex
          bg-white
          gap-4
          px-4
          py-2
          rounded-t-xl
          shadow-inner
          items-center
          justify-center
        >
          <div class="activity-logo">
            <slot name="activity-logo" />
          </div>
          <slot
            v-if="props.displayTimer"
            name="activity-timer"
          >
            <div
              class="activity-timer"
              font-semibold
              text-xl
              v-text="timer.format()"
            />
          </slot>
          <slot
            v-if="props.displayResets && props.maxResets"
            name="activity-resets"
          >
            <div
              class="activity-lifes"
              flex
              items-center
              justify-center
              text-red-500
            >
              <i
                v-for="life in resets.lifes.value"
                :key="life"
                inline-block
                i-mdi-heart
                w-6
                h-6
              />
              <i
                v-for="reset in resets.count.value"
                :key="reset"
                inline-block
                i-mdi-heart-outline
                w-6
                h-6
              />
            </div>
          </slot>
          <slot
            v-if="props.displayClose"
            name="activity-button-close"
          >
            <ButtonsClose @click="close" />
          </slot>
        </div>
      </header>
    </slot>

    <main
      class="activity-main"
      mt--2
      bg-white
      rounded-xl
      shadow-xl
      h-full
      flex-1
      container
      max-w-5xl
      w-full
      mx-auto
      overflow-y-auto
    >
      <h2
        v-if="statement || $slots['activity-statement']"
        class="activity-statement"
        text-center
        text-2xl
        font-black
        mx-4
        mt-10
      >
        <slot name="activity-statement">
          <div v-html="statement" />
        </slot>
      </h2>

      <div
        class="activity-container"
        w-full
      >
        <div m-4>
          <slot />
        </div>
      </div>
    </main>

    <slot name="activity-footer">
      <footer
        class="activity-footer"
        container
        max-w-5xl
        w-full
        z-30
        mx-auto
        flex
        items-center
        justify-center
        gap-2
        md:gap-4
        my-4
      >
        <slot name="activity-actions" />
        <slot
          v-if="props.displayTryAgain && !(status.isDeath() || status.isConfirm())"
          name="activity-button-try-again"
        >
          <ButtonsTryAgain
            w-full
            @click="tryAgain"
          />
        </slot>
        <slot
          v-if="props.displayCheck && status.isAlive()"
          name="activity-button-check"
        >
          <ButtonsCheck
            w-full
            @click="check"
          />
        </slot>
        <slot
          v-if="props.displayExit"
          name="activity-button-exit"
        >
          <ButtonsExit
            w-full
            @click="exit"
          />
        </slot>
      </footer>
    </slot>
  </section>
</template>
