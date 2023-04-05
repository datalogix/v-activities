<script setup lang="ts">
import 'eve'
import Snap from 'snapsvg'

export interface PaintSvgProps {
  color?: string
}

const props = defineProps<PaintSvgProps>()
const svg = ref<Snap.Paper>()

const generateImage = () => {
  if (!svg.value) return

  const blob = new Blob(
    [svg.value.select('svg').outerSVG()],
    { type: 'image/svg+xml' }
  )

  return URL.createObjectURL(blob)
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

const start = () => {
  svg.value?.selectAll('.colorize').forEach((element: Snap.Element) => {
    element.node.setAttribute('fill', '#fff')
  })
}

defineExpose({
  init,
  start,
  generateImage
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
