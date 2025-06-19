import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

test('Login con usuario recién registrado', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const homePage = new HomePage(page);

  const username = `user_${Date.now()}`;
  const password = 'Test123!';
  const firstName = 'Laura';
  const lastName = 'López';

  // Página de login inicial
  await loginPage.goto();
//   await expect(page).toHaveScreenshot('01-login-page.png');

  // Navegar a registro
  await loginPage.goToRegisterPage();
//   await expect(page).toHaveScreenshot('02-register-page.png');

  // Registro completado
  await registerPage.register(firstName, lastName, username, password);
//   await expect(page).toHaveScreenshot('03-after-registration.png');

  // Login exitoso
  await loginPage.login(username, password);
  await expect(homePage.logoutButton).toBeVisible();
//   await expect(page).toHaveScreenshot('04-homepage-after-login.png');
});
