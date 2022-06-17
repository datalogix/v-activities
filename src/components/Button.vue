<template>
  <button
    class="activity-button"
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
