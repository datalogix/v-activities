<script lang="ts" setup>
const { props, status, result, restart, check } = useActivity()
const slots = useSlots()
const hasDefaultSlotContent = computed(() => hasSlotContent(slots.default))
</script>

<template>
  <footer
    v-if="hasDefaultSlotContent || (props.canRestart && (status === 'playing' || result)) || (props.canCheck && status === 'playing')"
    class="activity-footer"
    border-t
    relative
    w-full
    z-30
    flex
    items-center
    justify-center
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
