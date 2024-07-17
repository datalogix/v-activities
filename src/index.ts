import Activities, { type ActivitiesProps } from './activities/Activities.vue'

import Activity, {
  type ActivityStatus,
  type ActivityMode,
  type ActivityMessage,
  type ActivityResult,
  type ActivityProps,
  type ActivityStoreParams
} from './activities/Activity.vue'

import ConnectTheDots, { type ConnectTheDotsProps } from './activities/ConnectTheDots/Index.vue'
import Crossword, { type CrosswordProps } from './activities/Crossword/Index.vue'
import DragAndDrop, { type DragAndDropProps } from './activities/DragAndDrop/Index.vue'
import Essay, { type EssayProps } from './activities/Essay/Index.vue'
import FillInTheBlanks, { type FillInTheBlanksProps } from './activities/FillInTheBlanks/Index.vue'
import Hangman, { type HangmanProps } from './activities/Hangman/Index.vue'
import MemoryGame, { type MemoryGameProps } from './activities/MemoryGame/Index.vue'
import MultipleChoice, { type MultipleChoiceProps } from './activities/MultipleChoice/Index.vue'
import Paint, { type PaintProps } from './activities/Paint/Index.vue'
import SpeechRecognition, { type SpeechRecognitionProps } from './activities/SpeechRecognition/Index.vue'
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
