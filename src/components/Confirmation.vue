<script setup lang="ts">
export type ConfirmationOptions = {
  title?: string
  message?: string
  ok?: () => void | Promise<void>
  cancel?: () => void | Promise<void>
}

const openned = ref<boolean>(false)
const options = reactive<ConfirmationOptions>({})

const open = async (opts: ConfirmationOptions = {}) => {
  Object.assign(options, opts)

  openned.value = true
}

const close = async () => {
  openned.value = false
}

const ok = async () => {
  if (options.ok) {
    await options.ok()
  }

  await close()
}

const cancel = async () => {
  if (options.cancel) {
    await options.cancel()
  }

  await close()
}

defineExpose({
  openned,
  open,
  close
})
</script>

<template>
  <Modal
    v-if="openned"
    class="activity-confirmation"
    z-40
  >
    <template #header>
      <i
        class="activity-confirmation-icon"
        i-mdi-warning-outline
        w-10
        h-10
      />
      <span
        class="activity-confirmation-title"
        text-xl
        v-text="options.title || 'Deseja realmente continuar?'"
      />
    </template>

    <slot>
      <div
        class="activity-confirmation-content"
        my-10
        v-html="options.message"
      />
    </slot>

    <template #footer>
      <div
        class="activity-confirmation-actions"
        grid
        grid-cols-2
        gap-4
      >
        <Button
          class="activity-confirmation-ok"
          text-white
          bg-green-500
          icon="i-mdi-check"
          text="Ok"
          @click="ok()"
        />

        <Button
          class="activity-confirmation-cancel"
          text-white
          bg-red-500
          icon="i-mdi-close"
          text="Cancelar"
          @click="cancel()"
        />
      </div>
    </template>
  </Modal>
</template>
