<script setup lang="ts">
import type { MaybeComputedElementRef } from '@vueuse/core'

const { props, header, footer } = useActivity()
const { height } = useWindowSize()

const headerSize = useElementSize(header as unknown as MaybeComputedElementRef, undefined, { box: 'border-box' })
const footerSize = useElementSize(footer as unknown as MaybeComputedElementRef, undefined, { box: 'border-box' })
const space = computed(() => headerSize.height.value + footerSize.height.value + 10)
</script>

<template>
  <main
    class="activity-main"
    :style="`height: ${height - space}px;`"
    mt--2
    bg-white
    rounded-xl
    shadow-xl
    container
    max-w-5xl
    w-full
    mx-auto
    overflow-y-auto
    flex
    flex-col
    xl:p-10
    lg:p-8
    md:p-6
    p-4
  >
    <div
      class="activity-statement"
      mb-4
    >
      <slot name="statement">
        <div v-html="props.statement" />
      </slot>
    </div>

    <div
      class="activity-container"
      flex-1
      grid
      content-center
    >
      <slot />
    </div>
  </main>
</template>
