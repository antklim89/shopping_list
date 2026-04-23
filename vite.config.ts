/// <reference types="vitest/config" />

import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
