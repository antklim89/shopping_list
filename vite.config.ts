/// <reference types="vitest" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
      alias: {
          '~': resolve(new URL('.', import.meta.url).pathname, './src'),
      },
  },
  test: {
    environment: 'jsdom'
  }
})
