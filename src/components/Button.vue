<script setup lang="ts">
export interface ButtonProps {
  disabled?: boolean
}

defineProps<ButtonProps>()
</script>

<template>
  <button
    class="activity-button"
    :class="{
      'cursor-not-allowed !bg-gray-400': disabled
    }"
    :disabled="disabled"
    type="button"
    rounded
    border-none
    outline-none
    inline-flex
    flex-col
    md:flex-row
    items-center
    justify-center
    transition-all
    gap-2
  >
    <slot />
  </button>
</template>
