import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            publicDirectory: "public",
            refresh: true,
        }),
        react(),
    ],
    test: {
        globals: true,           // allows using "describe/it/expect" without imports
        environment: 'jsdom',    // simulates a browser environment
        include: [
            '**/*.test.{js,jsx}',      // unit/component tests
            '**/__tests__/**/*.{js,jsx}'
        ],
        exclude: [
            'resources/js/e2e/**',  // ignore Playwright e2e files
            'node_modules/**'
        ],
        setupFiles: './resources/js/setupTests.js', // optional for RTL global imports
        run: true, // always run tests without watch/HMR
    },
});
