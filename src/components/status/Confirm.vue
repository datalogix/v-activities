<script setup lang="ts">
// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

</script>
<template>
  <Modal
    class="activity-status-confirm"
    z-50
  >
    <template #header>
      <span
        class="activity-status-confirm-title"
        text-xl
      >
        Deseja realmente deixar a resposta em branco?
      </span>
    </template>

    <slot />

    <div
      class="activity-status-confirm-actions"
      flex
      justify-around
      gap-4
      mt-10
    >
      <ButtonsConfirm @click="emits('confirm')" />
      <ButtonsCancel @click="emits('cancel')" />
    </div>
  </Modal>
</template>
