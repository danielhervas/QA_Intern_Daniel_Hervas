import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

test('Eliminar usuario tras login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const homePage = new HomePage(page);

  const username = `user_${Date.now()}`;
  const password = 'Test123!';
  const firstName = 'Mario';
  const lastName = 'Gómez';

  await loginPage.goto();
//   await expect(page).toHaveScreenshot('01-login-page.png');

  await loginPage.goToRegisterPage();
//   await expect(page).toHaveScreenshot('02-register-page.png');

  await registerPage.register(firstName, lastName, username, password);
//   await expect(page).toHaveScreenshot('03-after-registration.png');

  await loginPage.login(username, password);
  await expect(page.locator('tr', { hasText: username })).toBeVisible();
//   await expect(page).toHaveScreenshot('04-homepage-after-login.png');

  await homePage.deleteUser(username);
  await expect(page.locator('tr', { hasText: username })).toHaveCount(0);
//   await expect(page).toHaveScreenshot('05-after-user-deletion.png');
});
