<script lang="ts" setup>
const { props, status, result, restart, check } = useActivity()
</script>

<template>
  <footer
    class="activity-footer"
    bg-white
    relative
    container
    max-w-5xl
    w-full
    z-30
    mx-auto
    flex
    items-center
    justify-center
    rounded-b-xl
    shadow
    gap-2
    md:gap-4
    p-4
  >
    <slot />

    <Button
      v-if="props.canRestart && (status === 'playing' || result)"
      class="activity-button-restart"
      text-white
      bg-blue-500
      icon="i-mdi-refresh"
      text="Reiniciar"
      @click="restart()"
    />

    <Button
      v-if="props.canCheck && status === 'playing'"
      class="activity-button-check"
      :disabled="!props.canBeEmpty && !props.modelValue"
      text-white
      bg-green-500
      icon="i-mdi-check"
      text="Verificar"
      @click="check()"
    />
  </footer>
</template>
