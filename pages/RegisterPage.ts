// pages/RegisterPage.ts
import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#Text1');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('button', { hasText: 'Register' });
    this.cancelButton = page.locator('a', { hasText: 'Cancel' });
  }

  async register(firstName: string, lastName: string, username: string, password: string) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);

    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(lastName);

    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);

    await this.registerButton.waitFor({ state: 'visible' });
    await this.registerButton.click();
  }
}
