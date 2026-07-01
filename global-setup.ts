import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://test-astec-yca-v2.ycalabs.com/');

  // Fill login form using placeholder text
  await page.getByPlaceholder('Username').fill('emp1811@ycalabs.com');
  await page.getByPlaceholder('Password').fill('12345678');

  // Click the Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for navigation after successful login
  // ⚠️ Update this to match the actual post-login URL/page
  await page.waitForURL('https://test-astec-yca-v2.ycalabs.com/home', { timeout: 15000 });

  // Save the logged-in session state
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;