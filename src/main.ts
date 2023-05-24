import '@unocss/reset/tailwind.css'
import { Crossword } from './'
/*
createApp(ConnectTheDots, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'run',
  items: [
    { value: 'a', related: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { value: 'b', related: 'https://www.w3schools.com/html/horse.mp3' }
  ],
  answer: {
    left: [
      { value: 'a', related: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { value: 'b', related: 'https://www.w3schools.com/html/horse.mp3' },
      { value: 'c', related: '3' }
    ],
    right: [
      { related: 'b', value: 'https://www.w3schools.com/html/horse.mp3' },
      { related: 'a', value: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { related: 'c', value: '3' }
    ],
    selecteds: [
      {
        left: { value: 'a', related: '3' },
        right: { related: 'a', value: '3' }
      }
    ]
  }
}).mount('#app')
*/
/*
createApp(MemoryGame, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'run',
  items: [
    { value: 'a', related: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { value: 'b', related: 'https://www.w3schools.com/html/horse.mp3' }
  ],
  answer: {
    items: [
      { value: 'https://www.w3schools.com/html/horse.mp3', related: 'b' },
      { value: 'https://www.w3schools.com/html/mov_bbb.mp4', related: 'a' },
      { value: 'a', related: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { value: 'b', related: 'https://www.w3schools.com/html/horse.mp3' }
    ],
    selecteds: [
      { value: 'https://www.w3schools.com/html/mov_bbb.mp4', related: 'a' }
    ]
  }
}).mount('#app')
*/
/*
createApp(Hangman, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'answered',
  word: 'datalogix',
  answer: {
    items: ['L', 'X', 'T', 'F', 'M', 'G', 'I', 'W', 'S', 'E', 'O', 'H', 'U', 'D', 'N', 'P', 'A', 'R', 'K', 'Y'],
    right: ['L', 'X'],
    unique: ['D', 'A', 'T', 'L', 'O', 'G', 'I', 'X'],
    used: ['H', 'O', 'M', 'L', 'X'],
    wrong: ['H', 'M', 'C']
  }
}).mount('#app')
*/
/*
createApp(MultipleChoice, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'answered',
  answer: {
    selecteds: [2],
    options: [
      { value: 100, label: 'test<p>ddas dsad sah da hdjasjkf</p><p>ddas dsad s…da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p>e2' },
      { value: 100, label: 'test<p>ddas dfds fds fasdsad sah da hdjasjkf</p><p…da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p>e2' },
      { value: 0, label: 'teste1' }
    ]
  },
  options: [
    { value: 0, label: 'teste1' },
    { value: 100, label: 'test<p>ddas dsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p>e2' },
    { value: 100, label: 'test<p>ddas dfds fds fasdsad sah da hdjasjkf</p><p>ddas dfds fds fasdsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p>e2' }
  ]
}).mount('#app')
*/
/*
createApp(WordSearch, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  maxResets: 30,
  showResets: true,
  items: [
    {
      invert: true,
      diagonal: true,
      word: 'Datalogix'
    },
    'teste teste'
  ],
  mode: 'answered',
  answer: {
    foundWords: ['DATALOGIX'],
    usedWords: ['DATALOGIX', 'TESTETESTE'],
    foundTiles: [
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
      { x: 5, y: 8 },
      { x: 5, y: 9 }
    ],
    letterGrid: [
      ['G', 'H', 'T', 'P', 'V', 'Q', 'X', 'I', 'R', 'A'],
      ['I', 'W', 'V', 'N', 'W', 'X', 'R', 'D', 'C', 'H'],
      ['R', 'U', 'T', 'O', 'H', 'I', 'P', 'Q', 'F', 'M'],
      ['H', 'H', 'K', 'U', 'X', 'G', 'X', 'A', 'G', 'W'],
      ['D', 'D', 'Z', 'L', 'S', 'O', 'X', 'Z', 'A', 'A'],
      ['R', 'K', 'G', 'T', 'T', 'L', 'U', 'D', 'Y', 'S'],
      ['S', 'E', 'D', 'E', 'H', 'A', 'X', 'A', 'Q', 'N'],
      ['T', 'E', 'S', 'T', 'E', 'T', 'E', 'S', 'T', 'E'],
      ['V', 'U', 'S', 'L', 'K', 'A', 'U', 'Y', 'T', 'Z'],
      ['B', 'O', 'G', 'P', 'Z', 'D', 'Q', 'Y', 'S', 'M']
    ]
  }
}).mount('#app')
*/
/*
createApp(Paint, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  image: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/paint/xhS2tfG2VeIdRaFG4pB6WkpElJpahhznme1o9NCu.svg',
  mode: 'preview',
  answer: {
    image: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/paint/xhS2tfG2VeIdRaFG4pB6WkpElJpahhznme1o9NCu.svg'
  }
}).mount('#app')
*/
createApp(Crossword, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'run',
  items: [
    {
      x: 0,
      y: 0,
      type: 'vertical',
      word: 'datalogix',
      fixed: false
    },
    {
      x: 0,
      y: 0,
      type: 'horizontal',
      position: 1,
      word: 'datalogix',
      tip: 'empresa legal',
      fixed: false
    },
    {
      x: 0,
      y: 6,
      type: 'horizontal',
      position: 2,
      word: 'google'
    },
    {
      x: 8,
      y: 0,
      type: 'vertical',
      position: 3,
      word: 'xuxa',
      tip: 'texte'
    }
  ],
  answer: {
    values: [['a', '', '', '', '', '', '', '', ''], ['', null, null, null, null, null, '', null, null], ['', null, null, null, null, null, '', null, null], ['', null, null, null, null, null, '', null, null], ['', null, null, null, null, null, '', null, null], ['', null, null, null, null, null, '', null, null], ['', null, null, null, null, null, null, null, null], ['', null, null, null, null, null, null, null, null], ['c', '', '', '', null, null, null, null, null]]
  }
}).mount('#app')
