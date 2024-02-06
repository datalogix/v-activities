import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'pt-BR',
  title: 'Atividades',
  description: 'Atividades para Vue 3',

  lastUpdated: true,
  cleanUrls: true,

  scrollOffset: 'header',
  appearance: false,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guia', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Exemplos', link: '/examples/' },
      { text: 'Lançamentos', link: 'https://github.com/datalogix/v-activities/releases' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introdução',
          collapsed: false,
          items: [
            { text: 'Iniciar', link: '/guide/getting-started' },
            { text: 'Configuração', link: '/guide/configuration' },
          ],
        },

        {
          text: 'Atividades',
          collapsed: false,
          items: [
            { text: 'Múltipla escolha', link: '/guide/activities/multiple-choice' },
            { text: 'Preencha os espaços em branco', link: '/guide/activities/fill-in-the-blanks' },
            { text: 'Jogo da memória', link: '/guide/activities/memory-game' },
            { text: 'Caça palavra', link: '/guide/activities/word-search' },
            { text: 'Forca', link: '/guide/activities/hangman' },
            { text: 'Ligue os pontos', link: '/guide/activities/connect-the-dots' },
            { text: 'Arraste e solte', link: '/guide/activities/drag-and-drop' },
            { text: 'Colorir', link: '/guide/activities/paint' },
            { text: 'Montar palavra', link: '/guide/activities/assemble-word' },
            { text: 'Palavra Cruzada', link: '/guide/activities/crossword' },
            { text: 'Dissertativa', link: '/guide/activities/essay' },
          ],
        },
      ],
    },

    socialLinks: [
			{ icon: 'github', link: 'https://github.com/datalogix/v-activities' },
		],

    footer: {
      copyright: '© Copyright 2022-presente <a href="https://www.datalogix.com.br" target="_blank">Datalogix</a>',
    },
  }
})
