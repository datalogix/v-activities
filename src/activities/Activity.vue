<script setup lang="ts">
import type Header from '../components/Header.vue'
import type Footer from '../components/Footer.vue'
import type Confirmation from '../components/Confirmation.vue'
import type Result from '../components/Result.vue'
import type { ResultProps } from '../components/Result.vue'

export type ActivityStatus = 'loading' | 'playing' | 'stopped' | 'dead' | 'error'

export type ActivityMode = 'run' | 'preview' | 'answered'

export type ActivityResult = ResultProps

export type ActivityProps = {
  modelValue: unknown
  mode?: ActivityMode
  options?: unknown
  statement?: string
  background?: string
  load?: string[]
  answer?: unknown

  // Timer
  countdown?: boolean
  startTime?: number | string
  maxTime?: number | string
  showTimer?: boolean

  // Lifes
  usedResets?: number
  maxResets?: number
  showResets?: boolean

  // Result
  showResult?: boolean
  canBeEmpty?: boolean

  // Actions
  canRestart?: boolean
  canCheck?: boolean
  canExit?: boolean
}

export type ActivityStoreParams = ActivityProps & ActivityResult & {
  duration: number
  time: string
  resets: number
  answer: unknown
}

export type ActivityEmits = {
  (e: 'update:modelValue', value: unknown): void

  // helpers
  (e: 'preload'): void | Promise<void>
  (e: 'init'): void | Promise<void>
  (e: 'start'): void | Promise<void>
  (e: 'pause'): void | Promise<void>
  (e: 'stop'): void | Promise<void>

  // modes
  (e: 'run'): void | Promise<void>
  (e: 'preview'): void | Promise<void>
  (e: 'answered', answer: unknown): void | Promise<void>

  // actions
  (e: 'restart'): void | Promise<void>
  (e: 'check'): void | Promise<void>
  (e: 'store', params: ActivityStoreParams): void | Promise<void>
  (e: 'exit'): void | Promise<void>

  // timer
  (e: 'timer-time', time: number): void | Promise<void>
  (e: 'timer-play', time: number): void | Promise<void>
  (e: 'timer-pause', time: number): void | Promise<void>
  (e: 'timer-stop', time: number): void | Promise<void>
  (e: 'timer-restart', time: number): void | Promise<void>
  (e: 'timer-end', time: number): void | Promise<void>

  // resets
  (e: 'resets-increase', lifes: number): void | Promise<void>
  (e: 'resets-decrease', lifes: number): void | Promise<void>
  (e: 'resets-end', lifes: number): void | Promise<void>
}

const props = withDefaults(defineProps<ActivityProps>(), {
  mode: 'run',
  options: undefined,
  statement: undefined,
  background: undefined,
  load: () => [],
  answer: undefined,

  // Timer
  countdown: false,
  startTime: 0,
  maxTime: 0,
  showTimer: true,

  // Lifes
  usedResets: 0,
  maxResets: undefined,
  showResets: false,

  // Result
  showResult: true,
  canBeEmpty: true,

  // Actions
  canRestart: true,
  canCheck: true,
  canExit: true
})

const emits = defineEmits<ActivityEmits>()
const loader = useLoader((props.background ? [props.background] : []).concat(...props.load))
const media = useMedia()
const status = ref<ActivityStatus>('loading')
const header = ref<InstanceType<typeof Header>>()
const footer = ref<InstanceType<typeof Footer>>()
const timer = computed(() => header.value?.timer)
const resets = computed(() => header.value?.resets)
const confirmation = ref<InstanceType<typeof Confirmation>>()
const result = ref<ActivityResult>()

onMounted(async () => {
  await emits('preload')
  await loader.start()
  await media.load()
  await emits('init')

  switch (props.mode) {
    case 'run':
      await start()
      await emits('run')
      break
    case 'preview':
      await start()
      await emits('preview')
      break
    case 'answered':
      await emits('answered', props.answer)
      status.value = 'stopped'
      break
  }
})

const openResult = (_result: ActivityResult) => {
  result.value = _result
  status.value = 'stopped'
}

const closeResult = () => {
  result.value = undefined
}

const start = async () => {
  closeResult()

  await media.stop()
  await timer.value?.play()
  await emits('start')

  status.value = 'playing'
}

const pause = async () => {
  await media.stop()
  await timer.value?.pause()
  await emits('pause')

  status.value = 'loading'
}

const stop = async () => {
  await media.stop()
  await timer.value?.stop()
  await emits('stop')

  status.value = 'dead'
}

const restart = async () => {
  emits('update:modelValue', undefined)

  await resets.value?.increase()
  await timer.value?.restart()

  await emits('restart')
  await start()
}

const check = async () => {
  if (status.value !== 'playing') {
    return
  }

  await media.stop()

  if (!props.canCheck) {
    return store({ percentage: null, result: null })
  }

  if (props.modelValue === undefined && !timer.value?.isFinished) {
    return confirmation.value?.open({
      message: 'Deseja realmente deixar a resposta em branco?',
      ok: async () => {
        await pause()
        return emits('check')
      },
      cancel: () => {
        status.value = 'playing'
      }
    })
  }

  await pause()
  return emits('check')
}

const store = async (_result: ActivityResult) => {
  await pause()

  if (props.showResult) {
    openResult(_result)
  }

  await emits('store', {
    ...props,
    ..._result,
    duration: timer.value?.duration,
    time: timer.value?.formattedTime,
    resets: resets.value?.used,
    answer: props.modelValue
  } as ActivityStoreParams)
}

const exit = async () => {
  await media.stop()

  if (status.value === 'dead') {
    await pause()
    return emits('exit')
  }

  confirmation.value?.open({
    message: 'Deseja realmente sair?',
    ok: async () => {
      await pause()
      return emits('exit')
    },
    cancel: () => {
      status.value = 'playing'
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error = (e: unknown) => {
  status.value = 'error'
}

const provideAndExpose = {
  instance: getCurrentInstance(),
  props,
  loader,
  media,
  status,
  header,
  footer,
  timer,
  resets,
  confirmation,
  result,
  openResult,
  closeResult,
  start,
  pause,
  stop,
  restart,
  check,
  store,
  exit,
  error
}

provide('activity', provideAndExpose)
defineExpose(provideAndExpose)
</script>

<template>
  <section
    class="activity"
    bg-center-center
    bg-no-repeat
    bg-cover
    w-full
    min-h-screen
    relative
    p-2
    :style="background && { 'background-image': `url(${background})` }"
  >
    <slot name="activity-header">
      <Header ref="header">
        <slot name="activity-logo" />
      </Header>
    </slot>

    <slot name="activity-main">
      <Main>
        <template #statement>
          <slot name="activity-statement" />
        </template>

        <slot />
      </Main>
    </slot>

    <slot name="activity-footer">
      <Footer ref="footer">
        <slot name="activity-actions" />
      </Footer>
    </slot>

    <slot
      v-if="status === 'loading'"
      name="activity-loading"
    >
      <Loading />
    </slot>

    <slot
      v-if="status === 'dead'"
      name="activity-dead"
    >
      <Dead />
    </slot>

    <slot name="activity-confirmation">
      <Confirmation ref="confirmation" />
    </slot>

    <slot
      v-if="status === 'stopped' && result"
      name="activity-result"
    >
      <Result v-bind="result" />
    </slot>

    <slot
      v-if="status === 'error'"
      name="activity-error"
    >
      <Error />
    </slot>
  </section>
</template>
