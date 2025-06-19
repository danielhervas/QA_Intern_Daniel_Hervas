// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button', { hasText: 'Login' });
    this.registerLink = page.locator('a', { hasText: 'Register' });
  }

  async goto() {
    await this.page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);

    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }
}
