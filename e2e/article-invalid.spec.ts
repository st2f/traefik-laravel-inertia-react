import { test, expect } from '@playwright/test';

test('guest cannot access EditArticle and is redirected to login', { tag: '@smoke' }, async ({ page }) => {
  const response = await page.goto('/content/5');

  // Laravel typically returns a 302 redirect -> 200 login page
  expect(response?.status()).toBe(200);

  // Validate the redirect target
  await expect(page).toHaveURL('/login');
});
