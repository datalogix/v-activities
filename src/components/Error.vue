<template>
  <Modal class="activity-error">
    <template #header>
      <i
        class="activity-error-icon"
        i-mdi-warning-outline
        w-8
        h-8
      />
      <span
        class="activity-error-title"
        text-xl
      >
        Ocorreu algum problema
      </span>
    </template>

    <slot />
  </Modal>
</template>
