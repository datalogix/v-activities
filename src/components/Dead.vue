<template>
  <Modal
    class="activity-dead"
    z-60
  >
    <template #header>
      <i
        class="activity-dead-icon"
        i-cil-face-dead
        w-10
        h-10
      />
      <span
        class="activity-dead-title"
        text-xl
      >
        Voce excedeu o número de tentativas!
      </span>
    </template>

    <slot />
  </Modal>
</template>
