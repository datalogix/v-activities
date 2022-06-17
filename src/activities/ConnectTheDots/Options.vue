<script setup lang="ts">
import { ref } from 'vue'
import shuffle from 'lodash.shuffle'
import type { ConnectTheDotsOption } from './Index.vue'
import Option from './Option.vue'

export interface ConnectTheDotsOptionsProps {
  options: ConnectTheDotsOption[]
  type: 'left' | 'right'
}

const props = defineProps<ConnectTheDotsOptionsProps>()
const emits = defineEmits<{(e: 'select', option: ConnectTheDotsOption): void}>()

const options = ref(props.options)
const optionsRef = ref<InstanceType<typeof Option>[]>([])
const selected = ref<InstanceType<typeof Option>>()

const select = (option: ConnectTheDotsOption) => {
  if (selected.value) selected.value.clear()
  selected.value = optionsRef.value.find(o => o.option.value === option.value)
  selected.value?.select()
  emits('select', option)
}

const clear = () => {
  options.value = shuffle(options.value)

  if (selected.value) selected.value.clear()

  selected.value = undefined
}

defineExpose({
  selected,
  clear
})
</script>

<template>
  <transition-group
    tag="div"
    class="activity-connect-the-dots-options"
    flex
    flex-col
    justify-center
    items-center
    gap-4
  >
    <Option
      v-for="option in options"
      ref="optionsRef"
      :key="option.value"
      :option="option"
      :type="props.type"
      @select="select(option)"
    />
  </transition-group>
</template>
