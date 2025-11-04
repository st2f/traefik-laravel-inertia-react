import { Page } from "@playwright/test";

export async function consoleLogOut(page: Page) {
  // Log all outgoing requests
  page.on('request', request => {
    console.log('>>', request.method(), request.url());
  });

  // Log all incoming responses
  page.on('response', response => {
    console.log('<<', response.status(), response.url());
  });
}
