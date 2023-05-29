<script setup lang="ts">
export type MessageProps = {
  type: 'info' | 'advice' | 'warning' | 'error'
  content: string
}

defineProps<MessageProps>()
const { closeMessage } = useActivity()
</script>

<template>
  <Modal class="activity-message">
    <template #header>
      <i
        class="activity-message-icon"
        :class="{
          'text-blue-500 i-mdi-info': type === 'info',
          'text-gray-500 i-mdi-head-question': type === 'advice',
          'text-orange-500 i-mdi-warning-outline': type === 'warning',
          'text-red-500 i-mdi-close': type === 'error',
        }"
        w-20
        h-20
        mx-auto
      />
    </template>

    <slot>
      <div
        class="activity-message-content"
        text-xl
        my-10
        v-html="content"
      />
    </slot>

    <template #footer>
      <Button
        class="activity-message-ok"
        text-white
        bg-green-500
        icon="i-mdi-check"
        text="Ok"
        @click="closeMessage()"
      />
    </template>
  </Modal>
</template>
