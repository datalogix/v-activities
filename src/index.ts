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

import DragAndDrop from './activities/DragAndDrop/Index.vue'
import type { DragAndDropProps } from './activities/DragAndDrop/Index.vue'

import Essay from './activities/Essay/Index.vue'
import type { EssayProps } from './activities/Essay/Index.vue'

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

import SpeechRecognition from './activities/SpeechRecognition/Index.vue'
import type { SpeechRecognitionProps } from './activities/SpeechRecognition/Index.vue'

import WordSearch, { type WordSearchProps } from './activities/WordSearch/Index.vue'

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
  DragAndDropProps,
  EssayProps,
  FillInTheBlanksProps,
  HangmanProps,
  MemoryGameProps,
  MultipleChoiceProps,
  PaintProps,
  SpeechRecognitionProps,
  WordSearchProps
}

export {
  Activities,
  Activity,
  ConnectTheDots,
  Crossword,
  DragAndDrop,
  Essay,
  FillInTheBlanks,
  Hangman,
  MemoryGame,
  MultipleChoice,
  Paint,
  SpeechRecognition,
  WordSearch
}
