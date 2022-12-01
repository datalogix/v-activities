<script setup lang="ts">
import Activity from '../Activity.vue'
import Option from './Option.vue'

export type MemoryGameOption = {
  value: string
  related: string
}

export interface MemoryGameProps {
  options: Record<string, string>
  timeout?: number
  duration?: 'slower' | 'slow' | 'fast' | 'faster'
}

const props = withDefaults(defineProps<MemoryGameProps>(), {
  timeout: undefined,
  duration: undefined
})

const activity = ref<InstanceType<typeof Activity>>()
const optionsRef = ref<InstanceType<typeof Option>[]>([])
const option1 = ref<InstanceType<typeof Option>>()
const option2 = ref<InstanceType<typeof Option>>()
const options = ref<MemoryGameOption[]>([])

for (const key in props.options) {
  options.value.push({ value: key, related: props.options[key] })
  options.value.push({ value: props.options[key], related: key })
}

const select = (option: MemoryGameOption) => {
  if (option1.value && option2.value) {
    return
  }

  if (!option1.value) {
    option1.value = optionsRef.value.find(o => o.option.value === option.value)
    option1.value?.open()
    return
  }

  if (!option2.value) {
    option2.value = optionsRef.value.find(o => o.option.value === option.value)
    option2.value?.open()
  }

  if (option1.value?.option.value === option2.value?.option.related) {
    right()
  } else {
    wrong()
  }
}

const right = () => {
  option1.value?.lock()
  option2.value?.lock()
  option1.value = undefined
  option2.value = undefined

  if (!optionsRef.value.some(ref => !ref.locked)) {
    activity.value?.store(100, options)
  }
}

const wrong = () => {
  const timeout1 = option1.value?.timeout || 2000
  const timeout2 = option2.value?.timeout || timeout1

  setTimeout(() => {
    option1.value?.close()
    option2.value?.close()
    option1.value = undefined
    option2.value = undefined
  }, timeout1 > timeout2 ? timeout1 : timeout2)
}

const prepare = () => {
  optionsRef.value.forEach(ref => ref.reset())
  options.value = shuffle(options.value)
}
</script>

<template>
  <Activity
    ref="activity"
    class="activity-memory-game"
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

    <div flex>
      <transition-group
        tag="div"
        class="activity-memory-game-options"
        :class="{
          flex: options.length % 3 !== 0 && options.length % 4 !== 0,
          grid: options.length % 3 === 0 || options.length % 4 === 0,
          'flex-wrap': options.length % 3 !== 0 && options.length % 4 !== 0,
          'grid-cols-3': options.length % 3 === 0,
          'grid-cols-4': options.length % 4 === 0
        }"
        mx-auto
        gap-2
      >
        <Option
          v-for="option in options"
          ref="optionsRef"
          :key="option.value"
          :option="option"
          :timeout="timeout"
          :duration="duration"
          @select="select(option)"
        />
      </transition-group>
    </div>
  </Activity>
</template>
