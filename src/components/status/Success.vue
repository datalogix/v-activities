<template>
  <Modal class="activity-status-success">
    <template #header>
      <i
        class="activity-status-success-icon"
        text-green-500
        i-mdi-check
        w-6
        h-6
      />
      <h2
        class="activity-status-success-title"
        text-green-500
      >
        Parabéns!
      </h2>
    </template>

    <slot />
  </Modal>
</template>
