<script setup lang="ts">
export interface ConfirmProps {
  title?: string
  message?: string
}

defineProps<ConfirmProps>()

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
      <i
        class="activity-status-death-icon"
        i-mdi-alert-outline
        w-8
        h-8
      />
      <span
        class="activity-status-confirm-title"
        text-xl
        v-text="title || 'Deseja realmente continuar?'"
      />
    </template>

    <slot>
      <div
        class="my-10"
        v-html="message"
      />
    </slot>

    <template #footer>
      <div
        class="activity-status-confirm-actions"
        flex
        justify-around
        gap-4
      >
        <ButtonsConfirm @click="emits('confirm')" />
        <ButtonsCancel @click="emits('cancel')" />
      </div>
    </template>
  </Modal>
</template>
