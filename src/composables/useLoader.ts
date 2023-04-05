import { createHooks } from 'hookable'
import type { Hookable, HookKeys, HookCallback } from 'hookable'

import type { Fragment } from 'snapsvg'

export type LoaderKey = undefined | string | Blob
export type LoaderValue = HTMLImageElement | HTMLAudioElement | HTMLVideoElement | Fragment | ArrayBuffer | string | null

export type Hooks = {
  loaded: (item: LoaderKey, result: LoaderValue) => void
}

class Loader extends Map<LoaderKey, LoaderValue> {
  hooks: Hookable<Hooks>

  constructor (items: LoaderKey[] = []) {
    super()
    this.hooks = createHooks<Hooks>()
    items.forEach(item => this.add(item))
  }

  on (hook: HookKeys<Hooks>, callback: HookCallback) {
    this.hooks.hook(hook, callback)
  }

  add (item: LoaderKey) {
    if (item && !this.has(item)) {
      this.set(item, null)
    }
  }

  start () {
    return Promise.all(Array.from(this.keys()).map(item => this.load(item)))
  }

  async load (item: LoaderKey): Promise<LoaderValue> {
    let result = this.get(item)

    if (!result) {
      result = await this.prepare(item)

      this.set(item, result)

      this.hooks.callHook('loaded', item, result)
    }

    return result
  }

  prepare (item: LoaderKey): Promise<LoaderValue> {
    return new Promise((resolve, reject) => {
      if (!item) {
        resolve(null)
        return
      }

      if (item instanceof Blob) {
        const reader = new FileReader()
        reader.readAsDataURL(item as Blob)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
        return
      }

      const url = String(item)
      const ext = url.split('.').pop() || ''

      if (['jpg', 'jpeg', 'gif', 'png'].includes(ext)) {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = url
        return
      }

      if (['mp3', 'ogg', 'wav'].includes(ext)) {
        const audio = new Audio(url)
        audio.addEventListener('canplaythrough', () => resolve(audio))
        audio.addEventListener('error', reject)
        return
      }

      if (['mp4', 'webm', 'ogv'].includes(ext)) {
        const video = document.createElement('video')
        video.addEventListener('canplaythrough', () => resolve(video))
        video.addEventListener('error', reject)
        video.src = url
        return
      }

      fetch(url, {
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

export function useLoader (items?: LoaderKey[]) {
  const loader = new Loader(items)

  return loader
}
