export type STATUS = 'loading' | 'alive' | 'death' | 'success' | 'error' | 'confirm'

export interface ConfirmContent {
  title?: string
  message?: string
  confirm?:() => void
  cancel?: () => void
}

export function useStatus () {
  const emit = useEmit()
  const status = ref<STATUS>('loading')
  const content = reactive<ConfirmContent>({})

  const updateStatus = async (newStatus: STATUS) => {
    status.value = newStatus

    await emit(status.value)
  }

  return {
    content,
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
    confirm: async (title?: string, message?: string, confirm?: () => void, cancel ?: () => void) => {
      content.title = title
      content.message = message
      content.confirm = confirm
      content.cancel = cancel

      await updateStatus('confirm')
    }
  }
}
