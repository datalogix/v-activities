import { getCurrentInstance, ref, type ComponentInternalInstance } from 'vue'

export type STATUS = 'loading' | 'alive' | 'death' | 'success' | 'error' | 'confirm'

export function useStatus () {
  const { emit } = getCurrentInstance() as ComponentInternalInstance
  const status = ref<STATUS>('loading')

  const updateStatus = async (newStatus: STATUS) => {
    status.value = newStatus

    await emit(status.value)
  }

  return {
    isLoading: () => status.value === 'loading',
    isAlive: () => status.value === 'alive',
    isDeath: () => status.value === 'death',
    isSuccess: () => status.value === 'success',
    isError: () => status.value === 'error',
    isConfirm: () => status.value === 'confirm',
    loading: () => updateStatus('loading'),
    alive: () => updateStatus('alive'),
    death: () => updateStatus('death'),
    success: () => updateStatus('success'),
    error: () => updateStatus('error'),
    confirm: () => updateStatus('confirm')
  }
}
