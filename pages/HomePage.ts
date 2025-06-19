// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('a', { hasText: 'Logout' });
  }

  async logout() {
    // Forzamos el click aunque Playwright lo considere no interactuable
    await this.logoutButton.click({ force: true });
  }

  async deleteUser(username: string) {
    const userRow = this.page.locator('li', { hasText: username });
    const deleteButton = userRow.locator('a', { hasText: 'Delete' });
    await deleteButton.click();
  }

  async isUserVisible(username: string): Promise<boolean> {
    return await this.page.locator('li', { hasText: username }).isVisible();
  }
}
