import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { dashboardSelectors, logoutSelectors } from "./helpers/selectors";
import { consoleLogOut } from "./helpers/console"

test('user can log in and reach dashboard', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator(dashboardSelectors.header)).toHaveText('Dashboard');

});

test('user can log out', async ({ page }) => {
  await login(page);

  // click username to open dropdown
  await logoutSelectors.userButton(page).click();
  await logoutSelectors.submitButton(page).click();
  await expect(page).toHaveURL('/');
});
