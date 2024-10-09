/// <reference types="vitest" />
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(new URL('.', import.meta.url).pathname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
