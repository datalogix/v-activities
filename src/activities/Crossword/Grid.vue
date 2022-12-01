<script setup lang="ts">
export interface CrosswordItem {
  x: number
  y: number
  type: 'vertical' | 'horizontal'
  position: number
  word: string
  tip?: string
  fixed?: boolean
}

export interface CrosswordGrid {
  letter: string
  value: string
  position?: number
  fixed: boolean
  input?: HTMLInputElement
  items: CrosswordItem[]
}

export interface CrosswordGridProps {
  items: CrosswordItem[]
}

const props = defineProps<CrosswordGridProps>()
const rows = Math.max(...props.items.filter(item => item.type === 'vertical').map(item => item.word.length + item.y))
const cols = Math.max(...props.items.filter(item => item.type === 'horizontal').map(item => item.word.length + item.x))
const grid = ref<CrosswordGrid[][]>([...Array(cols)].map(() => Array(rows)))
const current = ref<CrosswordItem>()

const getByPoint = (x: number, y: number) => {
  if (!grid.value[x]) return null

  return grid.value[x][y]
}

const filterByPosition = (x: number, y: number) => {
  return props.items.filter((item) => (
    ((item.type === 'vertical' && item.x === x && y >= item.y && y <= item.y + item.word.length - 1) ||
    (item.type === 'horizontal' && item.y === y && x >= item.x && x <= item.x + item.word.length - 1))
  ))
}

[...props.items].sort((a, b) => {
  if (a.position > b.position) return 1
  if (a.position < b.position) return -1
  return 0
}).forEach(item => {
  item.word.split('').forEach((letter, index) => {
    const x = item.x + (item.type === 'horizontal' ? index : 0)
    const y = item.y + (item.type === 'vertical' ? index : 0)
    const fixed = filterByPosition(x, y).some((i) => i.fixed)

    if (!getByPoint(x, y)) {
      grid.value[x][y] = {
        input: undefined,
        letter,
        value: '',
        fixed,
        items: []
      }
    }

    grid.value[x][y].position = x === item.x && y === item.y ? item.position : undefined
    grid.value[x][y].items.push(item)
  })
})

const setCurrent = (x: number, y: number) => {
  const gridPoint = getByPoint(x, y)

  if (!gridPoint) {
    return
  }

  let items = gridPoint.items.filter(item => !item.fixed).filter((item) => (
    ((item.type === 'vertical' && item.x === x && y >= item.y && y <= item.y + item.word.length - 1) ||
    (item.type === 'horizontal' && item.y === y && x >= item.x && x <= item.x + item.word.length - 1))
  ))

  if (current.value) {
    items = items.filter((item) => {
      return item === current.value
    })
  }

  current.value = items[0]
}

const select = (x: number, y: number) => {
  const gridPoint = getByPoint(x, y)

  if (!gridPoint) {
    return
  }

  if (!gridPoint.fixed) {
    gridPoint.input?.select()

    setCurrent(x, y)
    return
  }

  current.value = undefined

  const item = gridPoint.items.filter(item => !item.fixed)[0]

  if (!item) {
    return
  }

  const posX = x + (item.type === 'horizontal' ? 1 : 0)
  const posY = y + (item.type === 'vertical' ? 1 : 0)
  const nextGridPoint = getByPoint(posX, posY)

  if (!nextGridPoint) {
    return
  }

  nextGridPoint.input?.focus()
}

const keyup = (event: KeyboardEvent, x: number, y: number) => {
  let items = getByPoint(x, y)?.items.filter(item => !item.fixed)

  if (!items?.length) {
    return
  }

  if (current.value) {
    items = items.filter((item) => {
      return item === current.value
    })
  }

  setCurrent(x, y)

  const isBackspace = event.key.toLocaleLowerCase() === 'backspace'
  const posX = x + (items[0].type === 'horizontal' ? (isBackspace ? -1 : 1) : 0)
  const posY = y + (items[0].type === 'vertical' ? (isBackspace ? -1 : 1) : 0)

  if (getByPoint(posX, posY)) {
    return getByPoint(posX, posY)?.input?.focus()
  }

  if (getByPoint(x, y) && !isBackspace) {
    getByPoint(x, y)?.input?.blur()
    current.value = undefined
  }
}

const isActive = (x: number, y: number) => {
  const gridPoint = getByPoint(x, y)

  if (!gridPoint || gridPoint.fixed) {
    return false
  }

  return gridPoint.items.some(item => item === current.value)
}

const getFilledWord = (item: CrosswordItem) => {
  let word = ''
  for (let index = 0; index < item.word.length; index++) {
    const x = item.x + (item.type === 'horizontal' ? index : 0)
    const y = item.y + (item.type === 'vertical' ? index : 0)
    const gridPoint = getByPoint(x, y)

    if (gridPoint) {
      word += gridPoint.value
    }
  }
  return word
}

const isEmptyWord = (item: CrosswordItem) => {
  let result = true

  for (let index = 0; index < item.word.length; index++) {
    const x = item.x + (item.type === 'horizontal' ? index : 0)
    const y = item.y + (item.type === 'vertical' ? index : 0)
    const gridPoint = getByPoint(x, y)

    if (!gridPoint || gridPoint.fixed) {
      continue
    }

    if (gridPoint.value !== '') {
      result = false
    }
  }

  return result
}

const clear = () => {
  current.value = undefined

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const gridPoint = getByPoint(x, y)

      if (!gridPoint) continue

      grid.value[x][y].value = gridPoint.fixed ? gridPoint.letter : ''
    }
  }
}

defineExpose({
  clear,
  select,
  getByPoint,
  getFilledWord,
  isEmptyWord
})
</script>

<template>
  <div class="activity-crossword-grid">
    <div
      v-for="(r, y) in rows"
      :key="`row_${y}`"
      class="activity-crossword-row"
      flex
      flex-wrap
      justify-center
    >
      <div
        v-for="(c, x) in cols"
        :key="`row_${y}_col_${x}`"
        class="activity-crossword-col"
      >
        <div
          class="activity-crossword-area"
          w-6
          h-6
          sm:w-8
          sm:h-8
          md:w-10
          md:h-10
          lg:w-14
          lg:h-14
          m-px
        >
          <div
            v-if="grid[x][y]"
            class="activity-crossword-item"
            relative
            w-full
            h-full
            @click="select(x, y)"
          >
            <span
              class="activity-crossword-position"
              absolute
              left-1
              top-1
              hidden
              md:block
              text-xs
              lg:text-sm
              v-text="grid[x][y].position"
            />
            <input
              :ref="el => { grid[x][y].input = el as HTMLInputElement }"
              v-model="grid[x][y].value"
              :disabled="grid[x][y].fixed"
              class="activity-crossword-input"
              :class="{
                'bg-blue-50 border-blue-300': isActive(x, y)
              }"
              w-full
              h-full
              text-base
              md:text-lg
              lg:text-xl
              uppercase
              text-center
              border
              maxlength="1"
              @focus="select(x, y)"
              @keyup="keyup($event, x, y)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
