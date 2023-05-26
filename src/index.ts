import Activities from './activities/Activities.vue'
import type { ActivitiesProps } from './activities/Activities.vue'

import Activity from './activities/Activity.vue'
import type {
  ActivityStatus,
  ActivityMode,
  ActivityMessage,
  ActivityResult,
  ActivityProps,
  ActivityStoreParams
} from './activities/Activity.vue'

import ConnectTheDots from './activities/ConnectTheDots/Index.vue'
import type { ConnectTheDotsProps } from './activities/ConnectTheDots/Index.vue'

import Crossword from './activities/Crossword/Index.vue'
import type { CrosswordProps } from './activities/Crossword/Index.vue'

import FillInTheBlanks from './activities/FillInTheBlanks/Index.vue'
import type { FillInTheBlanksProps } from './activities/FillInTheBlanks/Index.vue'

import Hangman from './activities/Hangman/Index.vue'
import type { HangmanProps } from './activities/Hangman/Index.vue'

import MemoryGame from './activities/MemoryGame/Index.vue'
import type { MemoryGameProps } from './activities/MemoryGame/Index.vue'

import MultipleChoice from './activities/MultipleChoice/Index.vue'
import type { MultipleChoiceProps } from './activities/MultipleChoice/Index.vue'

import Paint from './activities/Paint/Index.vue'
import type { PaintProps } from './activities/Paint/Index.vue'

import WordSearch from './activities/WordSearch/Index.vue'
import type { WordSearchProps } from './activities/WordSearch/Index.vue'

import 'uno.css'
import './assets/style.scss'

export type {
  ActivitiesProps,
  ActivityStatus,
  ActivityMode,
  ActivityMessage,
  ActivityResult,
  ActivityProps,
  ActivityStoreParams,
  ConnectTheDotsProps,
  CrosswordProps,
  FillInTheBlanksProps,
  HangmanProps,
  MemoryGameProps,
  MultipleChoiceProps,
  PaintProps,
  WordSearchProps
}

export {
  Activities,
  Activity,
  ConnectTheDots,
  Crossword,
  FillInTheBlanks,
  Hangman,
  MemoryGame,
  MultipleChoice,
  Paint,
  WordSearch
}
