import '@unocss/reset/tailwind.css'
import * as All from './'

createApp(All.DragAndDrop, {
  markerType: 'letter_uppercase',
  statement: 'dfs',
  // position: 'bottom',
  mode: 'run',
  items: [
    {
      content: '1Arrastes [esse1] texto e essa imagem [1uhuuuu]'
    },
    {
      content: '2Arrastes [esse2] texto e essa imagem [2uhuuuu]'
    },
    {
      content: '3Arrastes [esse3] texto e essa imagem [3uhuuuu]'
    },
    {
      content: '4Arrastes [esse4] [texto] e essa imagem [4uhuuuu]'
    },
    {
      content: '1Arrastes [esse] texto e essa [imagem] [<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">]'
    }
    /*
    {
      content: '2Arrastes [esse] texto e essa imagem [<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">]'
    },
    {
      content: '3Arrastes [esse] texto e essa imagem [<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">]'
    },
    {
      content: '4Arrastes [esse] texto e essa imagem [<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">]'
    }
      */
  ]
}).mount('#app')

/*
createApp(All.SpeechRecognition, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'run',
  text: 'O mundo é muito legal!',
  lang: 'pt-BR',
  answer: 'foo'
}).mount('#app')
*/
/*
createApp(All.ConnectTheDots, {
  statement: 'dfs',
  mode: 'run',
  items: [
    // { value: 'a', related: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { value: 'b', related: 'https://www.w3schools.com/html/horse.mp3' },
    { value: 'https://placehold.co/100x100.jpg', related: 'https://placehold.co/100x100.jpg' },
    { value: 'https://placehold.co/200x200.jpg', related: 'https://placehold.co/200x200.jpg' },
    { value: 'https://placehold.co/300x300.jpg', related: 'https://placehold.co/300x300.jpg' },
    { value: 'https://placehold.co/400x400.jpg', related: 'https://placehold.co/400x400.jpg' },
    { value: 'https://placehold.co/500x500.jpg', related: 'https://placehold.co/500x500.jpg' },
    { value: 'https://placehold.co/600x600.jpg', related: 'https://placehold.co/600x600.jpg' }
    // { value: 'c7', related: '37' },
    // { value: 'c8', related: 'https://edumais.com.br/imgs/logo-inline.png' }
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
      { related: 'c', value: 'b' }
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
createApp(All.Crossword, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'preview',
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
*/
/*
createApp(All.Essay, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'preview',
  text: 'Edumais é uma ferramente muito legal!',
}).mount('#app')
*/
/*
createApp(All.FillInTheBlanks, {
  markerType: 'letter_uppercase',
  mode: 'run',
  items: [
    {
      file: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/fill-in-the-blanks/n2bUX7ugJ5akgkFZrn02fwvKvaMFQQPleBaChw7e.mp3',
      content: '[<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">\\<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/ubwSnJbYkxP735fIXAqMpJOFfyFIJhbbjH3aqqcC.jpg" alt="" width="200" height="200">\\<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">]'
    },
    {
      file: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/fill-in-the-blanks/n2bUX7ugJ5akgkFZrn02fwvKvaMFQQPleBaChw7e.mp3',
      content: '[<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">\\<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/ubwSnJbYkxP735fIXAqMpJOFfyFIJhbbjH3aqqcC.jpg" alt="" width="200" height="200">\\<img src="https://edumais.s3.sa-east-1.amazonaws.com/editor/EZTmUcnqD9AYuD7W5APKdoAxbCHmu59wneakAAqM.jpg" alt="" width="200" height="200">]'
    },
    {
      content: 'AA [Canada][(xpto)] person [xpto] is from Canada.'
    },
    {
      content: 'A [C][a][n][a][d][i][a][n] person is from Canada.'
    },
    {
      content: 'A [S][p][a][n][i][s][h] person is [from|to] Spain.'
    },
    {
      content: 'A [teste a\\teste b\\teste c] person is from Spain.'
    },

    {
      content: null
    }
  ]
}).mount('#app')
*/
/*
createApp(All.Hangman, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'preview',
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
createApp(All.MemoryGame, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'run',
  items: [
    { value: 'a', related: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { value: 'b', related: 'as nkjashd  dasdas sa ds ad sadjkd dff sdjf dsj adshfjk hgfasdg hfsad ghj d fhds hfdsgh h fds fdsh asdhjfgshjfgh fgdsh jfdsg hfdasg jhjdsa jdsajf dsakfk dsakfdsa jkfdah jkfdashj fdsahj ajd ' }
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
createApp(All.MultipleChoice, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  mode: 'preview',
  cols: 1,
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
createApp(All.Paint, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  image: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/paint/xhS2tfG2VeIdRaFG4pB6WkpElJpahhznme1o9NCu.svg',
  mode: 'preview',
  answer: {
    image: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/paint/xhS2tfG2VeIdRaFG4pB6WkpElJpahhznme1o9NCu.svg'
  }
}).mount('#app')
*/
/*
createApp(All.WordSearch, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  maxResets: 30,
  showResets: true,
  // position: 'none',
  items: [
    {
      invert: true,
      diagonal: true,
      word: 'Datalogix',
      media: 'https://edumais.s3.sa-east-1.amazonaws.com/questions/paint/xhS2tfG2VeIdRaFG4pB6WkpElJpahhznme1o9NCu.svg'
    },
    'teste teste'
  ],
  mode: 'preview',
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
