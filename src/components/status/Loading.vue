<template>
  <Modal
    class="activity-status-loading"
    z-50
  >
    <template #header>
      <i
        class="activity-status-loading-icon"
        i-eos-icons-bubble-loading
        w-8
        h-8
      />
      <span
        class="activity-status-loading-title"
        text-xl
      >
        Carregando...
      </span>
    </template>

    <slot />
  </Modal>
</template>
