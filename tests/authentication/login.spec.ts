import { test, expect } from '@playwright/test';

test('User can login to YCA successfully', async ({ page }) => {
  await page.goto('/home');
  await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/home');
  await expect(page).toHaveTitle(/Astec/);
});