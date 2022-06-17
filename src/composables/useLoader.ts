export class Loader extends Map {
  constructor (items: string[] = []) {
    super()

    items.forEach(item => this.set(item, null))
  }

  add (item: string) {
    console.log(item)
    if (!this.has(item)) {
      this.set(item, null)
    }
  }

  start () {
    return Promise.all(Array.from(this.keys()).map(item => this.load(item)))
  }

  async load (item: string): Promise<HTMLImageElement|HTMLAudioElement|HTMLVideoElement> {
    let result = this.get(item)

    if (result === null || result === undefined) {
      result = await this.prepare(item)

      this.set(item, result)
    }

    return result
  }

  private prepare (item: string): Promise<HTMLImageElement|HTMLAudioElement|HTMLVideoElement|Snap.Fragment|string> {
    const ext = item.split('.').pop() || ''

    return new Promise((resolve, reject) => {
      if (['jpg', 'jpeg', 'gif', 'png'].includes(ext)) {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = item
        return
      }

      if (['mp3', 'ogg', 'wav'].includes(ext)) {
        const audio = new Audio(item)
        audio.addEventListener('canplaythrough', () => resolve(audio))
        audio.addEventListener('error', reject)
        return
      }

      if (['mp4', 'webm', 'ogv'].includes(ext)) {
        const video = document.createElement('video')
        video.addEventListener('canplaythrough', () => resolve(video))
        video.addEventListener('error', reject)
        video.src = item
        return
      }

      fetch(item, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(response => {
          return ['svg'].includes(ext)
            ? response.text()
            : response.json()
        })
        .then(resolve)
        .catch(reject)
    })
  }
}

export function useLoader (items?: string[]) {
  const loader = new Loader(items)

  return loader
}
