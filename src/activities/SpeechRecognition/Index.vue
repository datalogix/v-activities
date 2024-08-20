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
const answer = ref<SpeechRecognitionAnswer>()
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
  answer.value = undefined
}

const answered = (_answer: SpeechRecognitionAnswer) => {
  answer.value = _answer
}

const check = () => {
  speechRecognition.stop()

  const right = compare(replace(props.text), replace(answer.value ?? ''))

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
      flex
      items-center
      justify-center
      flex-col
      gap-6
    >
      <button
        v-if="speechRecognition.isSupported"
        type="button"
        :class="{
          'border-solid !border-blue-500 !scale-100': speechRecognition.isListening.value
        }"
        flex
        items-center
        rounded-full
        gap-2
        py-3
        px-10
        border-2
        border-gray-300
        border-dashed
        shadow-lg
        scale-95
        transition
        duration-300
        hover:scale-100
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
          text-blue-500
          w-10
          h-10
          i-mdi-pause
        />
        <span v-if="!speechRecognition.isListening.value">Clique qui para começar a gravação</span>
        <span v-if="speechRecognition.isListening.value">Gravando...</span>
      </button>
      <div
        v-else
        text-red-500
        border-2
        border-red-500
        p-4
        rounded
        text-lg
        flex
        items-center
        justify-center
        gap-6
        max-w-sm
      >
        <i
          text-red-500
          w-18
          h-18
          i-mdi-warning
        />
        <span>Infelizmente seu navegador não possui suporte para essa atividade.</span>
      </div>

      <div
        v-if="(showSpeechRecognition || activity?.props.mode === 'answered')"
        mx-auto
        border-2
        border-gray-500
        border-dashed
        p-4
        rounded
        opacity-70
        :class="{
          '!opacity-100 !border-blue-500': answer,
          'border-solid': answer && speechRecognition.isFinal.value
        }"
        v-text="answer ?? 'Comece a gravar e o reconhecimento de sua gravação irá aparecer aqui...'"
      />

      <div
        v-if="activity?.props.mode === 'preview'"
        border-2
        border-gray-300
        border-dashed
        p-4
        rounded
        v-text="text"
      />
    </div>
  </Activity>
</template>
