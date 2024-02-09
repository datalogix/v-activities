<script setup lang="ts">
import Activity from '../Activity.vue'

export type SpeechRecognitionAnswer = string
export type SpeechRecognitionProps = {
  text: string
  lang?: string
  showSpeechRecognition?: boolean
}

const props = withDefaults(defineProps<SpeechRecognitionProps>(), {
  lang: undefined,
  showSpeechRecognition: true
})
const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<SpeechRecognitionAnswer>('')
const speechRecognition = useSpeechRecognition({
  continuous: true,
  interimResults: true,
  lang: props.lang
})

speechRecognition.recognition?.addEventListener('result', () => {
  answer.value = speechRecognition.result.value.trim().replace('"', '')
})

watch(answer, () => {
  if (activity.value?.props.mode === 'answered') {
    return
  }

  if (answer.value?.length) {
    activity.value?.filled()
  } else {
    activity.value?.blank()
  }
}, { deep: true })

const start = () => {
  answer.value = ''
}

const answered = (_answer: SpeechRecognitionAnswer) => {
  answer.value = _answer
}

const check = () => {
  speechRecognition.stop()

  const right = compare(replace(props.text), replace(answer.value))

  return activity.value?.store({
    percentage: right ? 100 : 0,
    result: right
  })
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="speech"
    :options="props"
    @start="start"
    @answered="answered"
    @check="check"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <div
      v-if="speechRecognition.isSupported"
      flex
      items-center
      justify-center
      gap-10
    >
      <button
        type="button"
        w-16
        h-16
        rounded-full
        flex
        items-center
        justify-center
        border
        shadow-lg
        disabled:opacity-70
        disabled:cursor-not-allowed
        :disabled="activity?.props.mode === 'answered'"
        @click="speechRecognition.toggle()"
      >
        <i
          v-if="!speechRecognition.isListening.value"
          text-blue-500
          w-10
          h-10
          i-mdi-microphone
        />
        <i
          v-if="speechRecognition.isListening.value"
          text-red-500
          w-10
          h-10
          i-mdi-pause
        />
      </button>
    </div>
    <div v-else>
      Infelizmente seu navegador não possui suporte para essa atividade.
    </div>

    <div
      v-if="activity?.props.mode === 'preview'"
      mx-auto
      my-4
      opacity-70
      border
      p-4
      rounded
      v-text="text"
    />

    <div
      v-if="(showSpeechRecognition || activity?.props.mode === 'answered') && answer"
      mx-auto
      my-4
      v-text="answer"
    />
  </Activity>
</template>
