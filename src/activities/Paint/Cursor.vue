<script setup lang="ts">
export interface PaintCursorProps {
  eraser?: boolean
  color?: string
  alpha?: number
  lineWidth?: number
}

const props = defineProps<PaintCursorProps>()

const eraserCursor = `url(data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <path d="m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95l-4.95 4.95Z"></path>
  </svg>`
)}) 0 26, auto`

const brushCursor = computed(() => {
  return `url(data:image/svg+xml,${encodeURIComponent(
    `<svg version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
        <path fill="${props.color}" fill-opacity="${props.alpha}" d="M9.3,18.7c-2.3,0-4,1.7-4,4c0,1.7-1.6,2.7-2.7,2.7C3.9,26.9,6,28,8,28c2.9,0,5.3-2.4,5.3-5.3
            C13.3,20.4,11.6,18.7,9.3,18.7z M27.6,6.1l-1.7-1.7c-0.5-0.5-1.3-0.5-1.9,0l-12,12l3.7,3.7l12-12C28.1,7.6,28.1,6.7,27.6,6.1z"/>
        <path fill="none" stroke="#000000" width="2" d="M9.3,18.7c-2.3,0-4,1.7-4,4c0,1.7-1.6,2.7-2.7,2.7C3.9,26.9,6,28,8,28c2.9,0,5.3-2.4,5.3-5.3
            C13.3,20.4,11.6,18.7,9.3,18.7z M27.6,6.1l-1.7-1.7c-0.5-0.5-1.3-0.5-1.9,0l-12,12l3.7,3.7l12-12C28.1,7.6,28.1,6.7,27.6,6.1z"/>
    </svg>`
  )}) 0 26, auto`
})
</script>

<template>
  <div
    :style="{ cursor: eraser ? eraserCursor : brushCursor }"
    text-center
    mx-auto
  >
    <slot />
  </div>
</template>
