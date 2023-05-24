import type { ComponentInternalInstance } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Timer from './components/Timer.vue'
import Resets from './components/Resets.vue'
import Confirmation from './components/Confirmation.vue'
import type { ActivityMessage, ActivityProps, ActivityStatus, ActivityResult } from '../activities/Activity.vue'

export type ActivityInject = {
  instance: ComponentInternalInstance
  props: ActivityProps
  loader: typeof useLoader
  media: typeof useMedia
  status: ActivityStatus
  header: typeof Header
  footer: typeof Footer
  globalTimer: typeof Timer
  timer: typeof Timer
  resets: typeof Resets
  confirmation: typeof Confirmation
  message: ActivityMessage
  result: ActivityResult
  openMessage: (message: ActivityMessage) => void | Promise<void>
  closeMessage: () => void | Promise<void>
  openResult: (result: ActivityResult) => void | Promise<void>
  closeResult: () => void | Promise<void>
  start: () => void | Promise<void>
  pause: () => void | Promise<void>
  dead: () => void | Promise<void>
  restart: () => void | Promise<void>
  check: () => void | Promise<void>
  store: (result: ActivityResult) => void | Promise<void>
  finish: (force?: boolean) => void | Promise<void>
  exit: () => void | Promise<void>
  filled: () => void | Promise<void>
  blank: () => void | Promise<void>
}

export function useActivity () {
  return inject('activity') as ActivityInject
}
