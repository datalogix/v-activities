<template>
  <Modal class="activity-status-error">
    <template #header>
      <i
        class="activity-status-error-icon"
        text-red-500
        i-mdi-close
        w-6
        h-6
      />
      <h2
        class="activity-status-error-title"
        text-red-500
        text-xl
      >
        Tente novamente!
      </h2>
    </template>

    <slot />
  </Modal>
</template>
