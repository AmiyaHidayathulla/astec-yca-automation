import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  usernameInput = () => this.page.getByRole('textbox', { name: 'Username' });
  passwordInput = () => this.page.getByRole('textbox', { name: 'Password' });
  loginButton = () => this.page.getByRole('button', { name: 'Login' });

  // Actions
  async goto() {
    await this.page.goto('https://test-astec-yca-v2.ycalabs.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    // await this.page.waitForURL('**/home');
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/.*home.*/);
    await expect(this.page.getByRole('listitem').filter({ hasText: 'Home' }).getByRole('link')).toBeVisible();
  }

  async verifyLoginFailed() {
    await expect(this.page).not.toHaveURL('**/home');
  }

  async verifyPasswordMasked() {
    await expect(this.passwordInput()).toHaveAttribute('type', 'password');
  }
}