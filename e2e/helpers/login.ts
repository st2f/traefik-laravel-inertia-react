import { Page } from '@playwright/test';
import { env } from './env';
import { loginSelectors } from './selectors';
import { consoleLogOut } from "./console"

export async function login(page: Page) {
  await page.goto(`${env.baseURL}/login`);
  await loginSelectors.emailInput(page).fill(env.user.email);
  await loginSelectors.passwordInput(page).fill(env.user.password);
  await loginSelectors.submitButton(page).click();
  await page.waitForURL(`${process.env.APP_URL}/dashboard`);
  //await consoleLogOut(page);
}
