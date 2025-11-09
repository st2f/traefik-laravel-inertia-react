import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { categoriesSelectors as selector} from "./helpers/selectors";

test.describe('Category CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/content/categories');
  });

  test('view EditCategories page', { tag: '@smoke' }, async ({ page }) => {
    // Check that categories page is visible
    await expect(page.getByText('Categories update')).toBeVisible();
  });

  test('create a category', async ({ page }) => {
    // Click +
    await page.getByText('+').click();

    // Fill new category name
    await page.locator('#newCategory').fill(selector.originalName);

    // Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Assert it appeared
    const originalInput = page.locator(`input[value="${selector.originalName}"]`);
    await expect(originalInput).toBeVisible();
    await expect(originalInput).toHaveValue(selector.originalName);
  });

  test('update a category', async ({ page }) => {
    // Locate row
    const row = page.locator('.row', {
      has: page.locator(`input[value="${selector.originalName}"]`)
    });

    // Fill
    const input = row.locator('input');
    await input.fill(selector.updatedName);

    // Update
    await row.getByRole('button', { name: 'Update' }).click();

    // Reload page
    await page.goto('/content/categories');

    // Assert it appeared
    const updatedInput = page.locator(`input[value="${selector.updatedName}"]`);
    await expect(updatedInput).toBeVisible();
    await expect(updatedInput).toHaveValue(selector.updatedName);
  });

  test('delete a category', async ({ page }) => {

    const row = page.locator('.row', {
      has: page.locator(`input[value="${selector.updatedName}"]`),
    });

    await row.getByRole('button', { name: 'delete' }).click();

    const deletedInput = page.locator(`input[value="${selector.updatedName}"]`);
    await expect(deletedInput).toHaveCount(0);
  });
});
