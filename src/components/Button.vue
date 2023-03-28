<script setup lang="ts">
export interface ButtonProps {
  disabled?: boolean
}

defineProps<ButtonProps>()
</script>

<template>
  <button
    class="activity-button"
    :disabled="disabled"
    type="button"
    cursor-pointer
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
    disabled:cursor-not-allowed
    disabled:bg-gray-300
    hover:opacity-70
  >
    <slot />
  </button>
</template>
