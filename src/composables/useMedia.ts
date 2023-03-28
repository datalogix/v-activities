export function useMedia () {
  const elements: HTMLMediaElement[] = []

  const load = async () => {
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

  const stop = async () => {
    elements.forEach(element => {
      element.pause()
    })
  }

  return {
    load,
    stop
  }
}
