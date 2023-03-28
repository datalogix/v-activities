<template>
  <Modal class="activity-dead">
    <template #header>
      <i
        class="activity-dead-icon"
        i-cil-face-dead
        w-8
        h-8
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
