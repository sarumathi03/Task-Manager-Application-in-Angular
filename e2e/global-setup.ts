import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:4200/login');
  await page.getByTestId('username-input').fill('saru');
  await page.getByTestId('password-input').fill('saru1');
  await page.getByTestId('submit-button').click();

  await page.waitForURL(/\/home/);
  await page.context().storageState({ path: 'auth.json' });

  await browser.close();
}

export default globalSetup;


