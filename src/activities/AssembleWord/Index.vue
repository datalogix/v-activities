<script setup lang="ts">
import Activity from '../Activity.vue'
import Options from './Options.vue'
import Letters from './Letters.vue'
import type { AssembleWordOptionsActions } from './Options.vue'

export interface AssembleWordProps {
  word: string
}

defineProps<AssembleWordProps>()
const activity = ref<InstanceType<typeof Activity>>()
const options = ref<InstanceType<typeof Options>>()

const right = (actions: AssembleWordOptionsActions) => {
  if (actions.used.length >= actions.word.length) {
    activity.value?.store(100, actions)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wrong = (actions: AssembleWordOptionsActions) => {
  //
}

const prepare = () => {
  options.value?.prepare()
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-assemble-word"
    :can-check="false"
    @prepare="prepare"
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

    <Letters
      :word="word"
      :used="options?.used || []"
    />

    <Options
      ref="options"
      :word="word"
      @right="right"
      @wrong="wrong"
    />
  </Activity>
</template>
