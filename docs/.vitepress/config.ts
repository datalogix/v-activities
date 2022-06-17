import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Activities',
  description: 'Activities for Vue 3',
  lang: 'en-US',
  scrollOffset: 'header',
	srcDir: 'src',
  themeConfig: {

    /*socialLinks: [
			{ icon: 'github', link: 'https://github.com/datalogix/v-activities' },
			{ icon: 'twitter', link: 'https://twitter.com/datalogixbrasil' },
		],*/

		footer: {
			license: {
				text: 'MIT License',
				link: 'https://opensource.org/licenses/MIT',
			},
			copyright: 'Made with ❤️ by Datalogix',
		},

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Config Reference', link: '/config/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Release Notes', link: 'https://github.com/datalogix/v-activities/releases' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '' },
            { text: 'Setup', link: '/guide/teste' }
          ]
        },
      ],
      '/config/': [
        {
          text: 'Introduction',
          children: [
            { text: 'Our Story', link: '/config/' }
          ]
        },
        {
          text: 'Activities',
          children: [
            { text: 'Multiple Choice', link: '/config/multiple-choice' },
            { text: 'Memory Game', link: '/config/memory-game' },
            { text: 'Fill in the blanks', link: '/config/fill-in-the-blanks' },
            { text: 'Hangman', link: '/config/hangman' },
            { text: 'Word Search', link: '/config/word-search' },
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Activities',
          children: [
            { text: 'Multiple Choice', link: '/examples/multiple-choice' },
            { text: 'Memory Game', link: '/examples/memory-game' },
            { text: 'Fill in the blanks', link: '/examples/fill-in-the-blanks' },
            { text: 'Hangman', link: '/examples/hangman' },
            { text: 'Word Search', link: '/examples/word-search' },
          ]
        }
      ],
    }
  }
})
