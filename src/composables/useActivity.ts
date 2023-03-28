import type { ComponentInternalInstance } from 'vue'
import type Header from './components/Header.vue'
import type Footer from './components/Footer.vue'
import type Timer from './components/Timer.vue'
import type Lifes from './components/Lifes.vue'
import type Confirmation from './components/Confirmation.vue'
import type { ActivityProps, ActivityStatus, ActivityResult } from '../activities/Activity.vue'

export interface ActivityInject {
  instance: ComponentInternalInstance
  props: ActivityProps
  loader: typeof useLoader
  media: typeof useMedia
  status: ActivityStatus
  header: typeof Header
  footer: typeof Footer
  timer: typeof Timer
  resets: typeof Lifes
  confirmation: typeof Confirmation
  result: ActivityResult
  openResult: (result: ActivityResult) => void | Promise<void>
  closeResult: () => void | Promise<void>
  start: () => void | Promise<void>
  pause: () => void | Promise<void>
  stop: () => void | Promise<void>
  restart: () => void | Promise<void>
  check: () => void | Promise<void>
  store: (result: ActivityResult) => void | Promise<void>
  exit: () => void | Promise<void>
  error: () => void | Promise<void>
}

export function useActivity () {
  return inject('activity') as ActivityInject
}
