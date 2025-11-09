/// <reference types="vitest" />
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

// Define Vitest config
export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      publicDirectory: 'public',
      refresh: true,
    }),
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './resources/js/setupTests.ts',
    include: ['resources/js/**/*.test.tsx'],
    // Reporter configuration
    reporters: process.env.GITHUB_ACTIONS
      ? ['dot', 'github-actions', 'junit'] // github-actions for workflow annotations
      : ['tree'], // local pretty output
    outputFile: './test-results/vitest-results.xml', // JUnit file path
    silent: false, // ensures logs are printed
  },
})
