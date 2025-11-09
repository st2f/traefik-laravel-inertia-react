import { Page } from '@playwright/test';
import { env } from './env';

export const loginSelectors = {
  emailInput: (page: Page) => page.getByLabel('Email'),
  passwordInput: (page: Page) => page.getByLabel('Password'),
  submitButton: (page: Page) => page.getByRole('button', { name: /log in/i }),
};

export const logoutSelectors = {
  userButton: (page: Page) => page.getByRole('button', { name: `${env.user.username}` }),
  submitButton: (page: Page) => page.getByRole('button', { name: /log out/i }),
};

export const dashboardSelectors = {
  header: 'h2',
};

export const categoriesSelectors = {
  originalName: 'PlaywrightTest',
  updatedName: 'PlaywrightUpdated',
};
