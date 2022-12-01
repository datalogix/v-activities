import type { ComponentInternalInstance } from 'vue'

export function useEmit () {
  const { emit } = getCurrentInstance() as ComponentInternalInstance

  return (event: string, ...args: unknown[]) => new Promise(resolve => {
    emit(event, args)

    nextTick(() => resolve({ event, args }))
  })
}
