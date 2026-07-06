import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { TestData } from '../../utils/test-data';

test.describe('Login - Positive Cases', () => {

  test('TC_AUTH_001: Valid login redirects to home', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/home');
    await loginPage.verifyLoginSuccess();
    await expect(page).toHaveTitle(/Astec/);
  });

});

test.describe('Login - Negative Cases', () => {

  // Override stored session - these tests need fresh login each time
  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC_AUTH_002: Invalid username with valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser@ycalabs.com', TestData.validUser.password);
    await loginPage.verifyLoginFailed();
  });

  test('TC_AUTH_003: Valid username with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TestData.validUser.username, 'wrongpassword');
    await loginPage.verifyLoginFailed();
  });

  test('TC_AUTH_004: Empty username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.verifyLoginFailed();
  });

  test('TC_AUTH_005: Empty username only', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', TestData.validUser.password);
    await loginPage.verifyLoginFailed();
  });

  test('TC_AUTH_006: Empty password only', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TestData.validUser.username, '');
    await loginPage.verifyLoginFailed();
  });

  test('TC_AUTH_007: SQL injection in username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("' OR '1'='1", TestData.validUser.password);
    await loginPage.verifyLoginFailed();
  });

  test('TC_AUTH_008: Password field is masked', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.verifyPasswordMasked();
  });

});