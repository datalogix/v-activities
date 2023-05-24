<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Confirmation from '../components/Confirmation.vue'
import type { MessageProps } from '../components/Message.vue'
import type { ResultProps } from '../components/Result.vue'
import type { LoaderKey } from '../composables/useLoader'
import type { TimerParams } from '../components/Timer.vue'
import type { ResetsParams } from '../components/Resets.vue'

export type ActivityStatus = 'loading' | 'playing' | 'stopped'
export type ActivityMode = 'run' | 'preview' | 'answered'
export type ActivityMessage = MessageProps
export type ActivityResult = ResultProps

export type ActivityProps = {
  type: string
  options: unknown
  modelValue: unknown
  load?: LoaderKey[]
  mode?: ActivityMode
  answer?: unknown

  // Informations
  statement?: string
  instructions?: string
  color?: string
  background?: LoaderKey
  message?: ActivityMessage

  // Global Timer
  globalStartTime?: number | string
  globalMaxTime?: number | string
  globalShowTimer?: boolean
  globalCountdown?: boolean

  // Timer
  startTime?: number | string
  maxTime?: number | string
  showTimer?: boolean
  countdown?: boolean

  // Resets
  usedResets?: number | string
  maxResets?: number
  showResets?: boolean

  // Result
  showResult?: boolean
  canShowCorrectAnswer?: boolean
  canBeEmpty?: boolean

  // Actions
  canRestart?: boolean
  canCheck?: boolean
  canFinish?: boolean
  canExit?: boolean
}

export type ActivityStoreParams = ActivityProps & ActivityResult & {
  // global timer
  globalDuration?: number
  globalTime?: number
  globalIsFinished?: boolean

  // timer
  duration?: number
  time?: string
  isFinished?: boolean

  // resets
  resets?: number
  remaining?: number
  isDead?: boolean
}

export type ActivityEmits = {
  (e: 'update:modelValue', value: unknown): void

  // helpers
  (e: 'preload'): void | Promise<void>
  (e: 'init'): void | Promise<void>
  (e: 'start'): void | Promise<void>
  (e: 'pause'): void | Promise<void>

  // modes
  (e: 'run'): void | Promise<void>
  (e: 'preview'): void | Promise<void>
  (e: 'answered', answer: unknown): void | Promise<void>

  // actions
  (e: 'dead'): void | Promise<void>
  (e: 'restart'): void | Promise<void>
  (e: 'check'): void | Promise<void>
  (e: 'store', params: ActivityStoreParams): void | Promise<void>
  (e: 'finish'): void | Promise<void>
  (e: 'exit'): void | Promise<void>

  // global timer
  (e: 'global-timer-time', params: TimerParams): void | Promise<void>
  (e: 'global-timer-play', params: TimerParams): void | Promise<void>
  (e: 'global-timer-pause', params: TimerParams): void | Promise<void>
  (e: 'global-timer-stop', params: TimerParams): void | Promise<void>
  (e: 'global-timer-restart', params: TimerParams): void | Promise<void>
  (e: 'global-timer-end', params: TimerParams): void | Promise<void>

  // timer
  (e: 'timer-time', params: TimerParams): void | Promise<void>
  (e: 'timer-play', params: TimerParams): void | Promise<void>
  (e: 'timer-pause', params: TimerParams): void | Promise<void>
  (e: 'timer-stop', params: TimerParams): void | Promise<void>
  (e: 'timer-restart', params: TimerParams): void | Promise<void>
  (e: 'timer-end', params: TimerParams): void | Promise<void>

  // resets
  (e: 'resets-increase', params: ResetsParams): void | Promise<void>
  (e: 'resets-decrease', params: ResetsParams): void | Promise<void>
  (e: 'resets-end', params: ResetsParams): void | Promise<void>
}

const props = withDefaults(defineProps<ActivityProps>(), {
  mode: 'run',
  load: () => [],
  answer: undefined,

  // Informations
  statement: undefined,
  instructions: undefined,
  color: undefined,
  background: undefined,
  message: undefined,

  // Global Timer
  globalStartTime: 0,
  globalMaxTime: 0,
  globalShowTimer: false,
  globalCountdown: false,

  // Timer
  startTime: 0,
  maxTime: 0,
  showTimer: false,
  countdown: false,

  // Resets
  usedResets: 0,
  maxResets: 0,
  showResets: false,

  // Result
  showResult: true,
  canShowCorrectAnswer: false,
  canBeEmpty: true,

  // Actions
  canRestart: true,
  canCheck: true,
  canFinish: true,
  canExit: true
})

const emits = defineEmits<ActivityEmits>()
const loader = useLoader(((props.background ? [props.background] : []) as LoaderKey[]).concat(...props.load))
const media = useMedia()
const status = ref<ActivityStatus>('loading')
const header = ref<InstanceType<typeof Header>>()
const footer = ref<InstanceType<typeof Footer>>()
const globalTimer = computed(() => header.value?.globalTimer)
const timer = computed(() => header.value?.timer)
const resets = computed(() => header.value?.resets)
const confirmation = ref<InstanceType<typeof Confirmation>>()
const _message = ref<ActivityMessage>()
const result = ref<ActivityResult>()
const isEmpty = ref<boolean>(true)

onMounted(async () => {
  await emits('preload')
  await loader.start()
  await media.load()
  await emits('init')

  props.message && openMessage(props.message)

  if (props.mode === 'run') {
    await start()
    await emits('run')
    return
  }

  status.value = 'stopped'

  if (props.mode === 'answered') {
    await emits('answered', props.answer)
    return
  }

  await emits('preview')
  await emits('start')

  !props.message && openMessage({
    type: 'warning',
    content: 'Voce está no modo de pré-visualização!'
  })
})

const openMessage = async (activityMessage: ActivityMessage) => {
  _message.value = activityMessage
}

const closeMessage = async () => {
  _message.value = undefined

  if (props.mode === 'preview' && status.value === 'stopped') {
    await start()
  }
}

const openResult = async (activityResult: ActivityResult) => {
  status.value = 'stopped'
  result.value = activityResult
}

const closeResult = async () => {
  result.value = undefined
}

const start = async () => {
  await pause()

  if (resets.value?.isDead) {
    return
  }

  await globalTimer.value?.play()
  await timer.value?.play()

  status.value = 'playing'

  return emits('start')
}

const pause = async () => {
  await closeResult()
  await media.stop()
  await globalTimer.value?.pause()
  await timer.value?.pause()

  status.value = 'loading'

  return emits('pause')
}

const dead = async () => {
  await pause()

  if (props.canCheck) {
    await check()
  } else if (props.canFinish) {
    await finish()
  }

  return emits('dead')
}

const restart = async () => {
  emits('update:modelValue', undefined)
  blank()

  await resets.value?.increase()

  if (resets.value?.isDead) {
    return
  }

  await timer.value?.restart()
  await start()

  return emits('restart')
}

const check = async () => {
  await media.stop()
  await confirmation.value?.close()

  if (!props.canCheck || resets.value?.isDead) {
    return store()
  }

  const ok = async () => {
    await resets.value?.increase()
    await pause()
    return emits('check')
  }

  if (isEmpty.value && !timer.value?.isFinished && !resets.value?.isDead) {
    return confirmation.value?.open({
      title: 'Deseja realmente deixar a resposta em branco?',
      ok,
      cancel: () => {
        status.value = 'playing'
      }
    })
  }

  return ok()
}

const store = async (activityResult: ActivityResult|null = null) => {
  await pause()

  if (props.showResult && activityResult) {
    await openResult(activityResult)
  }

  const stored = { ...props }

  delete stored.modelValue

  return emits('store', {
    ...stored,

    // result
    ...(activityResult || {}),

    // answer
    answer: props.modelValue,

    // global timer
    globalDuration: globalTimer.value?.duration,
    globalTime: globalTimer.value?.formattedTime,
    globalIsFinished: globalTimer.value?.isFinished,

    // timer
    duration: timer.value?.duration,
    time: timer.value?.formattedTime,
    isFinished: timer.value?.isFinished,

    // resets
    resets: resets.value?.used,
    remaining: resets.value?.remaining,
    isDead: resets.value?.isDead
  } as ActivityStoreParams)
}

const finish = async (force = false) => {
  await media.stop()
  await confirmation.value?.close()

  const ok = async () => {
    await pause()
    return emits('finish')
  }

  if (resets.value?.isDead || force) {
    return ok()
  }

  return confirmation.value?.open({
    title: 'Deseja realmente finalizar?',
    ok
  })
}

const exit = async () => {
  await media.stop()
  await confirmation.value?.close()

  return confirmation.value?.open({
    title: 'Deseja realmente sair?',
    ok: async () => {
      await pause()
      return emits('exit')
    }
  })
}

const filled = () => {
  isEmpty.value = false
}

const blank = () => {
  isEmpty.value = true
}

const provideAndExpose = {
  instance: getCurrentInstance(),
  props,
  loader,
  media,
  status,
  header,
  footer,
  globalTimer,
  timer,
  resets,
  confirmation,
  message: _message,
  result,
  openMessage,
  closeMessage,
  openResult,
  closeResult,
  start,
  pause,
  dead,
  restart,
  check,
  store,
  finish,
  exit,
  filled,
  blank
}

provide('activity', provideAndExpose)
defineExpose(provideAndExpose)
</script>

<template>
  <Section :class="[`activity-${type}`, `activity-${type}-${mode}`]">
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
      v-if="resets?.isDead"
      name="activity-dead"
    >
      <Dead />
    </slot>

    <slot name="activity-confirmation">
      <Confirmation ref="confirmation" />
    </slot>

    <slot
      v-if="_message"
      name="activity-message"
    >
      <Message v-bind="_message" />
    </slot>

    <slot
      v-if="result"
      name="activity-result"
    >
      <Result v-bind="result" />
    </slot>
  </Section>
</template>
