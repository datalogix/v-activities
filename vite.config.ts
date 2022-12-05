import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import { name } from './package.json'

export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    eslintPlugin(),
    vue(),
    unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    }),
    autoImport({
      dts: 'src/@types/auto-imports.d.ts',
      imports: ['vue'],
      dirs: [
        'src/composables',
        'src/utils'
      ],
      eslintrc: {
        enabled: true
      }
    }),
    components({
      dts: 'src/@types/components.d.ts',
      directoryAsNamespace: true
    }),
    icons()
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name,
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'style.[ext]'
      }
    }
  },
  test: {
    environment: 'jsdom'
  }
})
