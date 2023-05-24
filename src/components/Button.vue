<script setup lang="ts">
export type ButtonProps = {
  icon?: string
  text?: string
}

defineProps<ButtonProps>()
</script>

<template>
  <button
    class="activity-button"
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
        class="activity-button-icon"
        :class="icon"
        w-6
        h-6
      />
      <span
        v-if="text"
        class="activity-button-text"
        v-text="text"
      />
    </slot>
  </button>
</template>
