<script setup lang="ts">
import 'eve'
import Snap from 'snapsvg'
import printJS from 'print-js'

export interface PaintSVGProps {
  image: string
  color?: string
}

const props = defineProps<PaintSVGProps>()
const svg = ref<Snap.Paper>()

const save = () => {
  if (!svg.value) return

  const canvasTemp = document.createElement('canvas')
  const a = document.createElement('a')
  const context = canvasTemp.getContext('2d')
  const blob = new Blob([svg.value.select('svg').outerSVG()], { type: 'image/svg+xml' })

  const image = new Image()
  image.src = URL.createObjectURL(blob)
  image.onload = () => {
    canvasTemp.width = 800
    canvasTemp.height = 400

    if (context) {
      context.clearRect(0, 0, canvasTemp.width, canvasTemp.height)
      context.drawImage(image, 0, 0)
    }

    a.setAttribute('download', 'paint.png')
    a.setAttribute('href', canvasTemp.toDataURL('image/png'))
    a.setAttribute('target', '_blank')
    a.click()
  }
}

const print = () => {
  printJS({ printable: 'svg', type: 'html' })
}

const init = (content: string) => {
  svg.value = Snap('#svg')
  svg.value?.append(Snap.parse(content) as Snap.Element)
  svg.value?.select('svg').attr({ width: '100%', height: '100%' })
  svg.value?.selectAll('[fill*="#fff" i]').forEach((element: Snap.Element) => {
    element.addClass('colorize')
    element.click(() => {
      if (props.color) {
        element.node.setAttribute('fill', props.color)
      }
    })
  })
}

const prepare = () => {
  svg.value?.selectAll('.colorize').forEach((element: Snap.Element) => {
    element.node.setAttribute('fill', '#fff')
  })
}

defineExpose({
  init,
  prepare,
  save,
  print
})
</script>

<template>
  <div
    id="svg"
    w-full
    h-60
    md:h-80
    lg:h-120
    mx-auto
  />
</template>
