<script setup lang="ts">
import level1 from './levels/1.png'
import level2 from './levels/2.png'
import level3 from './levels/3.png'
import level4 from './levels/4.png'
import level5 from './levels/5.png'
import level6 from './levels/6.png'
import level7 from './levels/7.png'

export interface HangmanLevelProps {
  current?: number
  levels?: string[]
}

const props = withDefaults(defineProps<HangmanLevelProps>(), {
  current: 0,
  levels: () => [
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7
  ]
})

defineExpose({
  max: props.levels.length - 1
})
</script>

<template>
  <div
    class="activity-hangman-levels"
    text-center
  >
    <img
      class="activity-hangman-level"
      :src="props.levels[props.current]"
      mx-auto
      max-h-40
      md:max-h-full
    >
  </div>
</template>
