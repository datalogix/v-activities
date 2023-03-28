<script setup lang="ts">
export interface ConfirmationOptions {
  title?: string
  message?: string
  ok?: () => void | Promise<void>
  cancel?: () => void | Promise<void>
}

const openned = ref<boolean>(false)
const options = reactive<ConfirmationOptions>({})

const open = (opts: ConfirmationOptions = {}) => {
  Object.assign(options, opts)

  openned.value = true
}

const close = () => {
  openned.value = false
}

const ok = async () => {
  if (options.ok) {
    await options.ok()
  }

  close()
}

const cancel = async () => {
  if (options.cancel) {
    await options.cancel()
  }

  close()
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
        i-mdi-alert-outline
        w-8
        h-8
      />
      <span
        class="activity-confirmation-title"
        text-xl
        v-text="options.title || 'Deseja realmente continuar?'"
      />
    </template>

    <slot>
      <div
        class="my-10"
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
        <Action
          v-if="options.cancel"
          class="activity-action-ok"
          text-white
          bg-green-500
          icon="i-mdi-check"
          text="Ok"
          @click="ok"
        />

        <Action
          v-if="options.cancel"
          class="activity-action-cancel"
          text-white
          bg-red-500
          icon="i-mdi-close"
          text="Cancelar"
          @click="cancel"
        />
      </div>
    </template>
  </Modal>
</template>
