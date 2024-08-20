<script setup lang="ts">
import type { CrosswordItem, CrosswordAnswer } from './Index.vue'

export type CrosswordGrid = {
  letter: string
  value: string
  position?: number
  fixed: boolean
  input?: HTMLInputElement
  items: CrosswordItem[]
}

export type CrosswordGridProps = {
  items: CrosswordItem[]
}

export type CrosswordGridEmits = {
  (e: 'update'): void
}

const props = defineProps<CrosswordGridProps>()
const emits = defineEmits<CrosswordGridEmits>()
const activity = useActivity()
const rows = Math.max(...props.items.filter(item => item.type === 'vertical').map(item => item.word.length + item.y))
const cols = Math.max(...props.items.filter(item => item.type === 'horizontal').map(item => item.word.length + item.x))
const grid = ref([...Array(cols)].map(() => Array<CrosswordGrid | undefined>(rows)))
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
    let point = getByPoint(x, y)

    if (!point) {
      grid.value[x][y] = point = {
        letter,
        value: '',
        fixed,
        input: undefined,
        items: []
      }
    }

    point.position = x === item.x && y === item.y ? item.position : undefined
    point.items.push(item)
  })
})

const setCurrent = (x: number, y: number) => {
  const point = getByPoint(x, y)

  if (!point) {
    return
  }

  let items = point.items.filter((item: CrosswordItem) => !item.fixed).filter((item: CrosswordItem) => (
    ((item.type === 'vertical' && item.x === x && y >= item.y && y <= item.y + item.word.length - 1) ||
    (item.type === 'horizontal' && item.y === y && x >= item.x && x <= item.x + item.word.length - 1))
  ))

  if (current.value) {
    items = items.filter((item: CrosswordItem) => {
      return item === current.value
    })
  }

  if (items.length > 1) {
    items = items.filter(item => item.position === point.position)
  }

  current.value = items[0]
}

const placeholder = (x: number, y: number) => {
  const item = getByPoint(x, y)

  return activity.props.mode !== 'preview' || !item || item.fixed
    ? ''
    : item.letter
}

const select = (x: number, y: number) => {
  const point = getByPoint(x, y)

  if (!point || activity.props.mode === 'answered') {
    return
  }

  if (!point.fixed) {
    point.input?.select()

    setCurrent(x, y)
    return
  }

  current.value = undefined

  const item = point.items.filter((item: CrosswordItem) => !item.fixed)[0]

  if (!item) {
    return
  }

  const posX = x + (item.type === 'horizontal' ? 1 : 0)
  const posY = y + (item.type === 'vertical' ? 1 : 0)
  const nextPoint = getByPoint(posX, posY)

  if (!nextPoint) {
    return
  }

  nextPoint.input?.focus()
}

const keyup = (event: KeyboardEvent, x: number, y: number) => {
  let items = getByPoint(x, y)?.items.filter((item: CrosswordItem) => !item.fixed)

  if (!items?.length) {
    return
  }

  if (current.value) {
    items = items.filter((item: CrosswordItem) => {
      return item === current.value
    })
  }

  setCurrent(x, y)
  emits('update')

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
  const point = getByPoint(x, y)

  return !point || point.fixed || activity.props.mode === 'answered'
    ? false
    : point.items.some((item: CrosswordItem) => item === current.value)
}

const getFilledWord = (item: CrosswordItem) => {
  let word = ''
  for (let index = 0; index < item.word.length; index++) {
    const x = item.x + (item.type === 'horizontal' ? index : 0)
    const y = item.y + (item.type === 'vertical' ? index : 0)
    const point = getByPoint(x, y)

    if (point) {
      word += point.value
    }
  }
  return word
}

const isEmptyWord = (item: CrosswordItem) => {
  let result = true

  for (let index = 0; index < item.word.length; index++) {
    const x = item.x + (item.type === 'horizontal' ? index : 0)
    const y = item.y + (item.type === 'vertical' ? index : 0)
    const point = getByPoint(x, y)

    if (!point || point.fixed) {
      continue
    }

    if (point.value !== '') {
      result = false
    }
  }

  return result
}

const clear = () => {
  current.value = undefined

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const point = getByPoint(x, y)

      if (!point) {
        continue
      }

      point.value = point.fixed ? point.letter : ''
    }
  }
}

const values = () => {
  return grid.value.map((points) => points.map((point) => {
    return point?.value
  }))
}

const answered = (answer: CrosswordAnswer) => {
  answer.values.forEach((points, x) => {
    points.forEach((value, y) => {
      const p = getByPoint(x, y)

      if (p && value) {
        p.value = value
      }
    })
  })
}

defineExpose({
  clear,
  select,
  getByPoint,
  getFilledWord,
  isEmptyWord,
  values,
  answered
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
            v-if="getByPoint(x, y)"
            class="activity-crossword-item"
            :class="{ '!cursor-not-allowed': activity.props.mode === 'answered' }"
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
              v-text="getByPoint(x, y)!.position"
            />
            <input
              :ref="(el: Element | ComponentPublicInstance | null) => { getByPoint(x, y)!.input = el as HTMLInputElement }"
              v-model="getByPoint(x, y)!.value"
              :disabled="getByPoint(x, y)!.fixed || activity.props.mode === 'answered'"
              class="activity-crossword-input"
              :class="{'bg-blue-50 border-blue-500': isActive(x, y)}"
              disabled:bg-gray-50
              disabled:cursor-not-allowed
              w-full
              h-full
              text-base
              md:text-lg
              lg:text-xl
              uppercase
              text-center
              rounded
              border
              border-solid
              border-gray-300
              maxlength="1"
              :placeholder="placeholder(x, y)"
              @focus="select(x, y)"
              @keyup="keyup($event, x, y)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
