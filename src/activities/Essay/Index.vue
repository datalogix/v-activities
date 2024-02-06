<script setup lang="ts">
import Activity from '../Activity.vue'

export type EssayAnswer = string
export type EssayProps = {
  rows?: number
  max?: number
}

const props = withDefaults(defineProps<EssayProps>(), {
  rows: 10,
  max: undefined
})
const activity = ref<InstanceType<typeof Activity>>()
const answer = ref<EssayAnswer>('')

watch(answer, () => {
  if (activity.value?.props.mode === 'answered') {
    return
  }

  if (props.max) {
    answer.value = answer.value.substring(0, props.max)
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

const answered = (_answer: EssayAnswer) => {
  answer.value = _answer
}

const check = () => {
  return activity.value?.store()
}
</script>

<template>
  <Activity
    ref="activity"
    v-model="answer"
    type="essay"
    :options="props"
    :show-result="false"
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
      flex-col
    >
      <textarea
        v-model="answer"
        class="activity-essay-textarea"
        resize-none
        flex-1
        p-2
        m-1
        border
        border-solid
        border-gray-300
        rounded
        disabled:cursor-not-allowed
        :disabled="activity?.props.mode === 'answered'"
        :rows="props.rows"
      />
      <i
        v-if="max"
        class="activity-essay-info"
      >
        {{ max - answer.length }} caracteres restantes
      </i>
    </div>
  </Activity>
</template>
