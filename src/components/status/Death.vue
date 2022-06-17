<template>
  <Modal class="activity-status-death">
    <template #header>
      <i
        class="activity-status-death-icon"
        i-cil-face-dead
        w-8
        h-8
      />
      <span
        class="activity-status-death-title"
        text-xl
      >
        Voce excedeu o número de tentativas!
      </span>
    </template>

    <slot />
  </Modal>
</template>
