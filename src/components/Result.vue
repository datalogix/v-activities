<script setup lang="ts">
export type ResultProps = {
  percentage: number | null
  result: { right: number, total: number } | boolean | number | null
}

defineProps<ResultProps>()
</script>

<template>
  <Modal class="activity-result">
    <div
      v-if="result === false || result === null"
      flex
      flex-col
      items-center
      space-y-4
      text-xl
    >
      <i
        i-mdi-close
        w-20
        h-20
        text-red-500
      />
      <span v-if="result === false">
        Infelizmente essa não é a resposta correta
      </span>
      <span v-if="result === null">
        Infelizmente sua resposta ficou em branco
      </span>
    </div>
    <div
      v-else-if="typeof result === 'object' && result?.right < 1"
      flex
      flex-col
      items-center
      space-y-4
      text-xl
    >
      <i
        i-mdi-close
        w-20
        h-20
        text-red-500
      />
      Você não acertou nenhuma
    </div>
    <div
      v-else
      flex
      flex-col
      items-center
      space-y-4
      text-xl
    >
      <i
        i-mdi-check
        w-20
        h-20
        text-green-500
      />
      <span v-if="result === true">
        Parabéns, você acertou!
      </span>
      <span v-else-if="typeof result === 'object'">
        Você acertou {{ result?.right }} de {{ result?.total }}
      </span>
      <span v-else>
        Você acertou {{ Math.round(Number(percentage)) }}%
      </span>
    </div>
  </Modal>
</template>
