import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Pages({
      dirs: './src/pages'
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router'
      ]
    })
  ],
})