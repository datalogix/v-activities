<script setup lang="ts">
import type { WordSearchItem, WordSearchAnswer } from './Index.vue'

export type WordSearchGridPosition = {
  x: number
  y: number
}

export type WordSearchGridProps = {
  size: number
  items: WordSearchItem[]
  shuffle?: boolean
}

export type WordSearchGridEmits = {
  (e: 'right', word: string): void
  (e: 'wrong', word: string, invertedWord: string): void
  (e: 'complete'): void
}

const props = withDefaults(defineProps<WordSearchGridProps>(), {
  size: 10,
  shuffle: true
})

const activity = useActivity()
const emits = defineEmits<WordSearchGridEmits>()

const _items = props.items.map(item => ({
  ...item,
  word: replace(item.word, '', { space: false }).toLocaleUpperCase()
}))

const _size = Math.max(props.size, ..._items.map(item => item.word.length), _items.length)
const usedWords = ref<string[]>([])
const foundWords = ref<string[]>([])
const letterGrid = ref<string[][]>([])
const gridWord = ref<string[][]>([])
const foundTiles = ref<WordSearchGridPosition[]>([])
const guess = ref<WordSearchGridPosition[]>([])
const selectedRange = ref<{start: WordSearchGridPosition|null, end: WordSearchGridPosition|null}>({ start: null, end: null })
const guessedWord = computed(() => guess.value.map(l => gridVal(l)).join(''))

const isAnswer = ({ x, y }: WordSearchGridPosition) => {
  return activity.props.mode === 'preview' &&
    typeof gridWord.value[y] !== 'undefined' &&
    typeof gridWord.value[y][x] !== 'undefined'
}

const isTileHighlighted = ({ x, y }: WordSearchGridPosition) => {
  const r = selectedRange.value

  if (r.start === null || r.end === null) {
    return false
  }

  const minX = Math.min(r.start.x, r.end.x)
  const maxX = Math.max(r.start.x, r.end.x)
  const minY = Math.min(r.start.y, r.end.y)
  const maxY = Math.max(r.start.y, r.end.y)

  if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
    return (
      r.start.x === r.end.x || r.start.y === r.end.y ||
        (Math.abs(r.start.x - x) === Math.abs(r.start.y - y))
    )
  }
}

const isTileAFoundWordTile = ({ x, y }: WordSearchGridPosition) => {
  for (let i = 0; i < foundTiles.value.length; i++) {
    if (foundTiles.value[i].x === x && foundTiles.value[i].y === y) {
      return true
    }
  }

  return false
}

const gridVal = ({ x, y }: WordSearchGridPosition) => {
  if (typeof letterGrid.value[y] !== 'undefined') {
    if (typeof letterGrid.value[y][x] !== 'undefined') {
      return letterGrid.value[y][x]
    }
  }

  return ''
}

const wordSelectStart = ({ x, y }: WordSearchGridPosition) => {
  if (activity.props.mode === 'answered') {
    return
  }

  selectedRange.value.start = { x, y }
}

const wordSelectUpdate = (event: Event, { x, y }: WordSearchGridPosition) => {
  if (selectedRange.value.start === null || activity.props.mode === 'answered') {
    return
  }

  const resetSelectedRange = () => {
    guess.value = []
    selectedRange.value = { start: null, end: null }
  }

  const right = (word:string) => {
    foundWords.value.push(word)
    foundTiles.value.push(...guess.value)

    resetSelectedRange()
    emits('right', word)

    if (usedWords.value.length === foundWords.value.length) {
      emits('complete')
    }
  }

  const dx = Math.abs(x - selectedRange.value.start.x)
  const dy = Math.abs(y - selectedRange.value.start.y)

  if ((dy === 0 && dx > 0) || (dx === 0 && dy > 0) || (dx === dy)) {
    selectedRange.value.end = { x, y }

    if (event.type === 'mouseup' || event.type === 'touchend') {
      guess.value = []

      const sx = selectedRange.value.start.x
      const sy = selectedRange.value.start.y
      const ex = selectedRange.value.end.x
      const ey = selectedRange.value.end.y

      // vertical
      if (dx === 0) {
        const step = ey > sy ? 1 : -1

        for (let i = sy; step > 0 ? (i <= ey) : (i >= ey); i += step) {
          guess.value.push({ x: sx, y: i })
        }
      }

      // horizontal
      if (dy === 0) {
        const step = ex > sx ? 1 : -1

        for (let i = sx; step > 0 ? (i <= ex) : (i >= ex); i += step) {
          guess.value.push({ x: i, y: sy })
        }
      }

      // diagonal
      if (dx !== 0 && dy !== 0) {
        const stepX = ex > sx ? 1 : -1
        const stepY = ey > sy ? 1 : -1

        for (
          let iX = sx, iY = sy;
          (stepY > 0 ? iY <= ey : iY >= ey) || (stepX > 0 ? iX <= ex : iX >= ex);
          iY += stepY, iX += stepX
        ) {
          guess.value.push({ x: iX, y: iY })
        }
      }

      const corretWord = gridWord.value[guess.value[0].y][guess.value[0].x]

      if (foundWords.value.indexOf(guessedWord.value) === -1 &&
        usedWords.value.indexOf(guessedWord.value) !== -1 &&
        guessedWord.value === corretWord
      ) {
        return right(corretWord)
      }

      const invertWord = guessedWord.value.split('').reverse().join('')

      if (
        foundWords.value.indexOf(invertWord) === -1 &&
        usedWords.value.indexOf(invertWord) !== -1 &&
        invertWord === corretWord
      ) {
        return right(invertWord)
      }

      emits('wrong', guessedWord.value, invertWord)
      resetSelectedRange()
    }
  } else if (event.type === 'mouseup' || event.type === 'touchend') {
    resetSelectedRange()
  } else {
    selectedRange.value.end = null
  }
}

const build = () => {
  letterGrid.value = [...Array(_size)].map(() => Array(_size))
  gridWord.value = [...Array(_size)].map(() => Array(_size))
  usedWords.value = []
  foundWords.value = []
  foundTiles.value = []
  guess.value = []

  Array.from(props.shuffle ? shuffle(_items) : _items).forEach(({ word, invert, diagonal }) => {
    if (word.length > _size) {
      return
    }

    let isValid = false
    let x = 0
    let y = 0
    let dx = 0
    let dy = 0
    let itterationCount = 0

    do {
      itterationCount += 1

      if (itterationCount > 100) {
        return
      }

      x = Math.floor(Math.random() * _size)
      y = Math.floor(Math.random() * _size)
      dx = 0
      dy = 0
      isValid = false

      const direction = Math.floor(Math.random() * 8)

      if (direction > 0 && direction < 4) {
        dx = 1
      } else if (direction > 4 && direction < 8) {
        dx = -1
      }

      if (direction < 2 || direction > 6) {
        dy = -1
      } else if (direction > 2 && direction < 6) {
        dy = 1
      }

      // Disable invert word
      if (!invert) {
        dx = Math.abs(dx)
        dy = Math.abs(dy)
      }

      if (!diagonal) {
        if (dx === 1) {
          dy = 0
        }

        if (dy === 1) {
          dx = 0
        }
      }

      try {
        const endX = x + (dx * word.length)

        if (endX < 0 || endX > _size) {
          throw new Error('Word exceeds width')
        }

        const endY = y + (dy * word.length)

        if (endY < 0 || endY > _size) {
          throw new Error('Word exceeds height')
        }

        for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
          const xCord = x + (cIndex * dx)
          const yCord = y + (cIndex * dy)

          if (letterGrid.value[yCord][xCord] !== undefined) {
            if (letterGrid.value[yCord][xCord] !== word[cIndex]) {
              throw new Error('Letter Overlap')
            }
          }
        }

        isValid = true
      } catch (err) {
        isValid = false
      }
    } while (!isValid)

    usedWords.value.push(word)

    for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
      const xCord = x + (cIndex * dx)
      const yCord = y + (cIndex * dy)

      letterGrid.value[yCord][xCord] = word[cIndex]
      gridWord.value[yCord][xCord] = word
    }
  })

  const generateCharOptions = generateOptionsFromString(_items.map(item => item.word).join(''))

  for (let y = 0; y < _size; y += 1) {
    for (let x = 0; x < _size; x += 1) {
      if (letterGrid.value[y][x] === undefined) {
        letterGrid.value[y][x] = generateChar(generateCharOptions)
      }
    }
  }

  if (usedWords.value.length !== _items.length) {
    build()
  }
}

const answered = (answer: unknown) => {
  usedWords.value = (answer as WordSearchAnswer).usedWords
  foundWords.value = (answer as WordSearchAnswer).foundWords
  letterGrid.value = (answer as WordSearchAnswer).letterGrid
  gridWord.value = (answer as WordSearchAnswer).gridWord
  foundTiles.value = (answer as WordSearchAnswer).foundTiles
}

build()

defineExpose({
  usedWords,
  foundWords,
  letterGrid,
  gridWord,
  foundTiles,
  build,
  answered
})
</script>

<template>
  <div
    v-for="(r, y) in _size"
    :key="`row_${y}`"
    flex
    flex-wrap
    justify-center
    class="activity-word-search-row"
  >
    <div
      v-for="(c, x) in _size"
      :key="`row_${y}_col_${x}`"
      tag="div"
      class="activity-word-search-col"
    >
      <div
        class="activity-word-search-letter"
        :class="{
          'bg-green-100 activity-word-search-letter-preview': isAnswer({ x, y }),
          '!bg-blue-300 activity-word-search-letter-highlighted': isTileHighlighted({ x, y }),
          '!bg-green-300 activity-word-search-letter-selected': isTileAFoundWordTile({ x, y }),
          '!cursor-not-allowed': activity.props.mode === 'answered',
        }"
        uppercase
        w-8
        h-8
        text-sm
        md:w-10
        md:h-10
        md:text-base
        lg:w-16
        lg:h-16
        lg:text-lg
        flex
        items-center
        justify-center
        border
        border-solid
        border-gray-300
        cursor-pointer
        @mousedown.prevent="wordSelectStart({ x, y })"
        @mouseup="(e) => wordSelectUpdate(e, { x, y })"
        @mousemove="(e) => wordSelectUpdate(e, { x, y })"
        @touchstart.prevent.passive="wordSelectStart({ x, y })"
        @touchend.passive="(e) => wordSelectUpdate(e, { x, y })"
        @touchmove.passive="(e) => wordSelectUpdate(e, { x, y })"
        v-text="gridVal({ x, y })"
      />
    </div>
  </div>
</template>
