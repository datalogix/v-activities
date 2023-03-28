import '@unocss/reset/tailwind.css'
import { Paint } from './'

// melhorar animações
// adicionar botão para marcar resposta correta
// adicionar um temporizador secundário

/*
createApp(Hangman, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  word: 'datalogix',
  mode: 'run',
  answer: {
    options: ['L', 'X', 'T', 'F', 'M', 'G', 'I', 'W', 'S', 'E', 'O', 'H', 'U', 'D', 'N', 'P', 'A', 'R', 'K', 'Y'],
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
  mode: 'run',
  maxResets: 30,
  showResets: true,
  answer: {
    value: 2,
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
  words: [
    {
      invert: true,
      diagonal: true,
      word: 'Datalogix'
    },
    'teste teste'
  ],
  mode: 'run',
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

createApp(Paint, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  image: '/test.png',
  imageToCompare: '/test6.png',
  mode: 'run',
  answer: {
    image: 'https://edumais.s3.sa-east-1.amazonaws.com/partners/UISLkUtuLMapywkaT4qwjGAYGfrjxFXbckG24SSY.png'
  }
}).mount('#app')
