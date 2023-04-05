<template>
  <Modal
    class="activity-loading"
    z-50
  >
    <template #header>
      <i
        class="activity-loading-icon"
        i-eos-icons-bubble-loading
        w-10
        h-10
      />
      <span
        class="activity-loading-title"
        text-xl
      >
        Carregando...
      </span>
    </template>

    <slot />
  </Modal>
</template>
