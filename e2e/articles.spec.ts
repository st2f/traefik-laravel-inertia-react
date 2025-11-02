import { test, expect } from '@playwright/test';

test('can navigate to an article', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Docker installation on ubuntu 22.04');
    await expect(page.locator('h1')).toHaveText(/Docker installation/);
});
