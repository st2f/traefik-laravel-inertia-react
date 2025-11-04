import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './e2e',
  timeout: 5000,
  retries: 0,
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

  // ✅ Tell Playwright to use the correct tsconfig
  // (Playwright auto-detects tsconfig.e2e.json if named like this)
  // But we enforce it to avoid ambiguity.
  projects: [
    {
      name: 'e2e',
      use: {},
      metadata: {
        tsconfig: './tsconfig.e2e.json'
      }
    }
  ]
});
