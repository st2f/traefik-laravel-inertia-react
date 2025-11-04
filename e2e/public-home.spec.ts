import { test, expect } from '@playwright/test';

test('homepage loads', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Type/i);
    await expect(page.locator('text=Latest')).toBeVisible();
});

