/*
import { Hangman, WordSearch, Paint, MemoryGame, ConnectTheDots, Crossword, DragAndDrop, FillInTheBlanks, MultipleChoice } from './'
createApp(Hangman, {
  word: 'ppic tu_1-rie',
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(WordSearch, {
  words: ['foo', 'bar'],
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(Paint, {
  image: 'https://macmillanonlineplacementtest.com/images/bg.png',
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(MemoryGame, {
  options: {
    teste1: 'teste2',
    teste3: 'teste4',
    teste5: 'teste6',
    teste55: 'teste65',
    teste655: 'teste665',
    tes1te55: 'test35e65'
  },
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(ConnectTheDots, {
  options: {
    teste5: 'teste6',
    teste55: 'testfgdsfe65',
    teste655: 'testgfdsgsdgde665',
    tes1te55: 'testgfdsgdfsgfds35e65'
  },
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(Crossword, {
  items: [
    {
      x: 0,
      y: 0,
      type: 'vertical',
      position: 1,
      word: 'futebol',
      tip: 'Dica 1'
    },
    {
      x: 0,
      y: 0,
      type: 'horizontal',
      position: 1,
      word: 'fute-bol',
      tip: 'Dica 2'
    }
  ],
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(DragAndDrop, {
  items: [
    {
      html: `
        Pedro Guimarães ainda não havia se [pronunciado] oficialmente sobre o caso até a última atualização desta reportagem.
        O colunista do g1 Valdo Cruz informou <b>que</b> a expectativa entre [integrantes]<br>do governo é que Pedro Guimarães deixe o cargo ainda nesta quarta-feira.
      `
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: `
        Pedro Guimarães ainda não havia se [pronunciado] oficialmente sobre o caso até a última atualização desta reportagem.
        O colunista do g1 Valdo Cruz informou <b>que</b> a expectativa entre [integrantes]<br>do governo é que Pedro Guimarães deixe o cargo ainda nesta quarta-feira.
      `
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: 'https://macmillanonlineplacementtest.com/images/bg.png'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: 'x [teste1]'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: '[teste2]'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: '[teste3]'
    }
  ],
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
createApp(FillInTheBlanks, {
  items: [
    {
      html: `
        Pedro Guimarães ainda não havia se [pronunciado] oficialmente sobre o caso até a última atualização desta reportagem.
        O colunista do g1 Valdo Cruz informou <b>que</b> a expectativa entre [integrantes]<br>do governo é que Pedro Guimarães deixe o cargo ainda nesta quarta-feira.
      `
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: `
        Pedro Guimarães ainda não havia se [pronunciado] oficialmente sobre o caso até a última atualização desta reportagem.
        O colunista do g1 Valdo Cruz informou <b>que</b> a expectativa entre [integrantes]<br>do governo é que Pedro Guimarães deixe o cargo ainda nesta quarta-feira.
      `
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: 'x [X]'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: '[teste2]'
    },
    {
      file: 'https://macmillanonlineplacementtest.com/images/bg.png',
      html: '[teste3]'
    }
  ],
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
*/
import { MultipleChoice } from './'

createApp(MultipleChoice, {
  statement: 'dfs<p>fds</p>dafadsfdsafds',
  options: [
    { percentage: 0, label: 'teste1' },
    { percentage: 100, label: 'test<p>ddas dsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p>e2' },
    { percentage: 100, label: 'test<p>ddas dfds fds fasdsad sah da hdjasjkf</p><p>ddas dfds fds fasdsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p><p>ddas dsad sah da hdjasjkf</p>e2' }
  ],
  background: 'https://macmillanonlineplacementtest.com/images/bg.png'
}).mount('#app')
