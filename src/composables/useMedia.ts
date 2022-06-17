import { nextTick } from 'vue'

export function useMedia () {
  const elements: HTMLMediaElement[] = []

  const load = () => {
    nextTick(() => {
      document.querySelectorAll('.activity-main audio, .activity-main video').forEach(element => {
        if (element instanceof HTMLMediaElement) {
          element.setAttribute('controlsList', 'nodownload noplaybackrate')
          element.oncontextmenu = () => false
          elements.push(element)
        }
      })
    })
  }

  const stop = () => {
    elements.forEach(element => {
      element.pause()
    })
  }

  return {
    load,
    stop
  }
}
