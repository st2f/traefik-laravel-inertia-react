import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config(); // load .env

export default defineConfig({
    testDir: './e2e',
    timeout: 30000,
    retries: 1,
    use: {
        baseURL: process.env.APP_URL || 'http://localhost:3000',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
    },
    reporter: [
        ['list'],
        ['junit', { outputFile: 'playwright-report/results.xml' }]
    ],
});
