<script lang="ts" setup>
const closed = ref(false)
</script>

<template>
  <Message
    class="activity-orientation bg-opacity-90! z-100! portrait:hidden md:hidden!"
    :class="{'hidden!': closed }"
    type="warning"
    content="Por favor, vire o dispositivo para uma melhor experiência."
  >
    <template #footer>
      <Button
        class="activity-message-ok"
        text-white
        bg-green-500
        icon="i-mdi-check"
        text="Ok"
        @click="closed = true"
      />
    </template>
  </Message>
</template>
