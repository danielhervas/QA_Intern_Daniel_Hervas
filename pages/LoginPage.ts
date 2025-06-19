// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.registerLink = page.locator('a[href="#/register"]');
  }

  async goto() {
    await this.page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
  }

  async login(username: string, password: string) {
    // Rellenar campos
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // Pulsar Enter en password para disparar ng-submit
    await this.passwordInput.press('Enter');
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }
}
