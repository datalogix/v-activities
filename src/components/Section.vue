<script setup lang="ts">
const { props, loader } = useActivity()
const background = ref()

// @ts-ignore
loader.on('loaded', (item, content) => {
  if (item === props.background) {
    background.value = content instanceof HTMLImageElement
      ? content.src
      : content
  }
})
</script>

<template>
  <section
    class="activity"
    bg-center-center
    bg-no-repeat
    bg-cover
    w-full
    h-svh
    p-2
    :style="{
      'background-color': props.color,
      'background-image': background ? `url(${background})` : undefined,
    }"
  >
    <slot />
  </section>
</template>
