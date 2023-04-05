<script lang="ts" setup>
const { props, status, result, restart, check, finish } = useActivity()
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

    <Button
      v-if="props.canFinish && status !== 'loading' && props.mode === 'run'"
      class="activity-button-finish"
      text-white
      bg-gray-500
      icon="i-mdi-exit-to-app"
      text="Finalizar"
      @click="finish()"
    />
  </footer>
</template>
