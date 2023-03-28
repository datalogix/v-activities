<script lang="ts" setup>
const { props, status, result, restart, check, exit } = useActivity()
</script>

<template>
  <footer
    class="activity-footer"
    relative
    container
    max-w-5xl
    w-full
    z-30
    mx-auto
    flex
    items-center
    justify-center
    gap-2
    md:gap-4
    pt-4
  >
    <slot />

    <Action
      v-if="props.canRestart && (status === 'playing' || status === 'error' || result)"
      class="activity-action-restart"
      text-white
      bg-blue-500
      icon="i-mdi-refresh"
      text="Reiniciar"
      @click="restart"
    />

    <Action
      v-if="props.canCheck && status === 'playing'"
      class="activity-action-check"
      :disabled="!props.canBeEmpty && !props.modelValue"
      text-white
      bg-green-500
      icon="i-mdi-check"
      text="Verificar"
      @click="check"
    />

    <Action
      v-if="props.canExit && !(status === 'loading' || props.mode === 'answered')"
      class="activity-action-exit"
      text-white
      bg-gray-500
      icon="i-mdi-exit-to-app"
      text="Sair"
      @click="exit"
    />
  </footer>
</template>
