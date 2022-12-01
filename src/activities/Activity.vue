<script setup lang="ts">
export interface ActivityProps {
  statement?: string
  background?: string
  load?: string[]
  countdown?: boolean
  startTime?: number|string
  maxTime?: number|string
  maxResets?: number
  showResultMessage?: boolean
  showTimer?: boolean
  showResets?: boolean
  canBeEmpty?: boolean
  canClose?:boolean
  canTryAgain?: boolean
  canCheck?: boolean
  canFinish?: boolean
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
  startTime: 0,
  maxTime: 0,
  maxResets: undefined,
  showResultMessage: true,
  showTimer: true,
  showResets: false,
  canBeEmpty: true,
  canClose: true,
  canTryAgain: true,
  canCheck: true,
  canFinish: true
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  // actions
  (e: 'init'): Promise<void>
  (e: 'prepare'): Promise<void>
  (e: 'close', time: number): Promise<void>
  (e: 'tryAgain', resets: number): Promise<void>
  (e: 'check', time: number): Promise<void>
  (e: 'fill', value: unknown): Promise<void>
  (e: 'confirm'): Promise<void>
  (e: 'cancel'): Promise<void>
  (e: 'store', params: ActivityStoreParams): Promise<void>
  (e: 'finish', time: number): Promise<void>

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
const timer = useTimer(props.startTime, props.maxTime, props.countdown)
const isEmpty = ref(true)

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

const fill = async (value: unknown = null) => {
  isEmpty.value = Array.isArray(value) ? value.length === 0 : value === null

  await emits('fill', value)
}

const close = async () => {
  media.stop()

  return await status.confirm(
    'Confirmação',
    'Deseja realmente sair?',
    async () => {
      await timer.pause()
      await emits('close', timer.time.value)
    },
    status.alive
  )
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

const calculateAndStore = (items: unknown[] = [], rights: unknown[] = [], isEmpty = false) => {
  const percentage = rights.length * 100 / items.length

  store(isEmpty ? null : percentage, { items, rights })
}

const store = async (percentage: number|null = null, selecteds: unknown = {}) => {
  media.stop()

  if (percentage === null) {
    return await status.confirm(
      'Confirmação',
      'Deseja realmente deixar a resposta em branco?',
      execute,
      status.alive
    )
  }

  await execute(percentage, selecteds)
}

const execute = async (percentage: number|null = null, selecteds: unknown = {}) => {
  await timer.pause()

  if (props.showResultMessage && percentage !== null) {
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

const finish = async () => {
  media.stop()

  return await status.confirm(
    'Confirmação',
    'Deseja realmente finalizar?',
    async () => {
      await timer.pause()
      await emits('finish', timer.time.value)
    },
    status.alive
  )
}

defineExpose({
  ...status,
  loader,
  media,
  timer,
  isEmpty,
  fill,
  resets,
  close,
  tryAgain,
  check,
  calculateAndStore,
  store,
  finish
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
        :title="status.content.title"
        :message="status.content.message"
        @confirm="status.content.confirm"
        @cancel="status.content.cancel"
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
          <slot name="activity-logo" />

          <slot
            v-if="showTimer"
            name="activity-timer"
          >
            <div
              class="activity-timer"
              font-semibold
              v-text="timer.format()"
            />
          </slot>
          <slot
            v-if="showResets && maxResets"
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
            v-if="props.canClose"
            name="activity-button-close"
          >
            <ButtonsClose @click="close" />
          </slot>
        </div>
      </header>
    </slot>

    <div
      mx-4
      h-full
      flex-1
    >
      <main
        class="activity-main"
        mt--2
        bg-white
        rounded-xl
        shadow-xl
        h-full
        container
        max-w-5xl
        w-full
        mx-auto
        overflow-y-auto
        flex
        flex-col
        xl:p-10
        lg:p-8
        md:p-6
        p-4
      >
        <h2
          v-if="statement || $slots['activity-statement']"
          class="activity-statement"
          mb-4
        >
          <slot name="activity-statement">
            <div v-html="statement" />
          </slot>
        </h2>

        <div
          class="activity-container"
          mt-4
          flex-1
        >
          <slot />
        </div>
      </main>
    </div>

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
          v-if="props.canTryAgain && !(status.isDeath() || status.isConfirm())"
          name="activity-button-try-again"
        >
          <ButtonsTryAgain
            w-full
            @click="tryAgain"
          />
        </slot>
        <slot
          v-if="canCheck && status.isAlive()"
          name="activity-button-check"
        >
          <ButtonsCheck
            :disabled="!canBeEmpty && isEmpty"
            w-full
            @click="check"
          />
        </slot>
        <slot
          v-if="canFinish"
          name="activity-button-finish"
        >
          <ButtonsFinish
            w-full
            @click="finish"
          />
        </slot>
      </footer>
    </slot>
  </section>
</template>
