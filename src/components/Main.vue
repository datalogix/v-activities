<script setup lang="ts">
const { props } = useActivity()
</script>

<template>
  <main
    class="activity-main"
    flex-1
    w-full
    border-b
    overflow-y-auto
    flex
    flex-col
    lg:px-10
    md:p-6
    p-4
  >
    <div
      v-if="props.statement"
      class="activity-statement"
      mb-6
      lg:mb-10
      space-y-4
    >
      <div v-html="props.statement" />
      <slot name="statement" />
    </div>

    <div
      class="activity-container"
      flex-1
      grid
      content-center
    >
      <slot />
    </div>
  </main>
</template>
