<script setup lang="ts">
import * as All from '../'

export interface ActivitiesProps {
  model: string,
}

const props = defineProps<ActivitiesProps>()
const component = computed(() => {
  // @ts-ignore
  return All[pascalCase(props.model)]
})
</script>

<template>
  <component
    :is="component"
  />
</template>
