import { computed, ref } from 'vue'

export function useResets (max = 0) {
  const count = ref(0)
  const lifes = computed(() => max - count.value)

  const increase = () => {
    count.value++
  }

  const decrease = () => {
    count.value--
  }

  return {
    count,
    lifes,
    increase,
    decrease
  }
}
