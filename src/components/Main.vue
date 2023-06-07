<script setup lang="ts">
const { props } = useActivity()
</script>

<template>
  <main
    class="activity-main"
    flex-1
    bg-white
    rounded-xl
    shadow-xl
    container
    max-w-5xl
    w-full
    mx-auto
    overflow-y-auto
    flex
    flex-col
    xl:p-10
    lg:p-8
    md:p-6
    p-4
  >
    <div
      class="activity-statement"
      mb-4
    >
      <slot name="statement">
        <div v-html="props.statement" />
      </slot>
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
