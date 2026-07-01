import { test, expect } from '@playwright/test';

test.describe('Login - Positive Cases', () => {

  test('TC_AUTH_001: Valid login redirects to home', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/home');
    await expect(page).toHaveTitle(/Astec/);
  });

});

test.describe('Login - Negative Cases', () => {

  // Override stored session - these tests need a fresh login each time
  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC_AUTH_002: Invalid username with valid password', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await page.getByPlaceholder('Username').fill('wronguser@ycalabs.com');
    await page.getByPlaceholder('Password').fill('12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL('**/home');
  });

  test('TC_AUTH_003: Valid username with invalid password', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await page.getByPlaceholder('Username').fill('emp1811@ycalabs.com');
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL('**/home');
  });

  test('TC_AUTH_004: Empty username and password', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL('**/home');
  });

  test('TC_AUTH_005: Empty username only', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await page.getByPlaceholder('Password').fill('12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL('**/home');
  });

  test('TC_AUTH_006: Empty password only', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await page.getByPlaceholder('Username').fill('emp1811@ycalabs.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL('**/home');
  });

  test('TC_AUTH_007: SQL injection in username', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await page.getByPlaceholder('Username').fill("' OR '1'='1");
    await page.getByPlaceholder('Password').fill('12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL('**/home');
  });

  test('TC_AUTH_008: Password field is masked', async ({ page }) => {
    await page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await expect(page.getByPlaceholder('Password')).toHaveAttribute('type', 'password');
  });

});