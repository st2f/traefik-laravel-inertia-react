import { test, expect } from '@playwright/test';
import { login } from './helpers/login';


test('authenticated user can access EditArticle page', { tag: '@smoke' }, async ({ page }) => {
  // Login
  await login(page);

  // Navigate to edit page
  const response = await page.goto('/content/5');

  // Verify successful access
  expect(response?.status()).toBe(200);

  // Check that article content is visible
  await expect(page.getByText('Article 5 update')).toBeVisible();
});
