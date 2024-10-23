<script setup lang="ts">
export type PaintImagePosition = {
  x?: number
  y?: number
}

export type PaintImagePoint = {
  x: number
  y: number
  dx: number
  dy: number
  color: string
  lineWidth: number
  alpha: number
}

export type PaintImageProps = {
  eraser?: number
  color?: string
  lineWidth?: number
  alpha?: number
}

const props = defineProps<PaintImageProps>()
const img = ref<HTMLImageElement>()
const canvas = ref<HTMLCanvasElement>()
const ctx = computed(() => canvas.value?.getContext('2d'))
const position = ref<PaintImagePosition>()
const points = ref<PaintImagePoint[]>([])

const clearDraw = () => {
  if (!canvas.value || !ctx.value || !img.value) return

  const ratio = Math.min(canvas.value.width / img.value.width, canvas.value.height / img.value.height)
  ctx.value.globalAlpha = 1
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.value.drawImage(
    img.value,
    0,
    0,
    img.value.width,
    img.value.height,
    (canvas.value.width - img.value.width * ratio) / 2,
    (canvas.value.height - img.value.height * ratio) / 2,
    img.value.width * ratio,
    img.value.height * ratio
  )
}

const redraw = () => {
  clearDraw()

  points.value.forEach(point => {
    draw(point)
  })
}

const draw = (point: PaintImagePoint) => {
  if (!ctx.value) return

  ctx.value.beginPath()
  ctx.value.strokeStyle = point.color
  ctx.value.lineWidth = point.lineWidth
  ctx.value.globalAlpha = point.alpha
  ctx.value.globalCompositeOperation = 'source-over'
  ctx.value.moveTo(point.x, point.y)
  ctx.value.lineTo(point.dx, point.dy)
  ctx.value.stroke()
  ctx.value.closePath()
}

const mouseup = () => {
  position.value = {
    x: undefined,
    y: undefined
  }
}

const mousedown = (event: MouseEvent) => {
  if (!canvas.value) return

  const { x, y } = canvas.value.getBoundingClientRect()

  position.value = {
    x: event.clientX - x,
    y: event.clientY - y
  }
}

const mousemove = (event: MouseEvent) => {
  if (
    !canvas.value ||
    position.value?.x === undefined ||
    position.value?.y === undefined ||
    props.color === undefined ||
    props.lineWidth === undefined ||
    props.alpha === undefined
  ) {
    return
  }

  const { x, y } = canvas.value.getBoundingClientRect()
  const dx = event.clientX - x
  const dy = event.clientY - y

  if (props.eraser) {
    points.value = points.value.filter((p) => {
      if (!props.eraser) return true

      return !(
        dx - props.eraser < p.dx &&
        dx + props.eraser > p.dx &&
        dy - props.eraser < p.dy &&
        dy + props.eraser > p.dy
      )
    })

    return redraw()
  }

  const point = {
    x: position.value.x,
    y: position.value.y,
    dx,
    dy,
    color: props.color,
    lineWidth: props.lineWidth,
    alpha: props.alpha
  }

  position.value = {
    x: dx,
    y: dy
  }

  points.value.push(point)

  return draw(point)
}

const generateImage = () => {
  if (!canvas.value) return

  return canvas.value.toDataURL('image/png')
}

const init = (content: HTMLImageElement) => {
  img.value = content

  const resizeCanvas = () => {
    if (canvas.value) {
      if (window.innerWidth < 768) {
        canvas.value.width = 300
        canvas.value.height = 200
      } else if (window.innerWidth < 1024) {
        canvas.value.width = 600
        canvas.value.height = 300
      } else {
        canvas.value.width = 800
        canvas.value.height = 400
      }
    }

    clearDraw()
  }

  useEventListener(window, ['resize', 'orientationchange'], resizeCanvas, false)
  resizeCanvas()
}

const start = () => {
  points.value = []
  clearDraw()
}

defineExpose({
  init,
  start,
  generateImage
})
</script>

<template>
  <canvas
    ref="canvas"
    mx-auto
    @mouseup="mouseup"
    @mousedown="mousedown"
    @mousemove="mousemove"
  />
</template>
