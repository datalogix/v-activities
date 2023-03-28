<script setup lang="ts">
export interface ActionProps {
  icon?: string
  text?: string
}

defineProps<ActionProps>()
</script>

<template>
  <Button
    class="activity-action"
    w-full
    text-base
    md:text-lg
    font-bold
    p-2
    md:p-4
  >
    <slot>
      <i
        v-if="icon"
        class="activity-action-icon"
        :class="icon"
        w-6
        h-6
      />
      <span
        v-if="text"
        class="activity-action-text"
        v-text="text"
      />
    </slot>
  </Button>
</template>
