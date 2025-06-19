import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

test('Registro de usuario nuevo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);

  const username = `user_${Date.now()}`;
  const password = 'Test123!';
  const firstName = 'Juan';
  const lastName = 'Pérez';

  // Página de login inicial
  await loginPage.goto();
  await expect(page).toHaveScreenshot('01-login-page.png');

  // Navegar a registro
  await loginPage.goToRegisterPage();
  await expect(page).toHaveScreenshot('02-register-page.png');

  // Completar registro
  await registerPage.register(firstName, lastName, username, password);

  // Aquí validamos que volvió a login luego de registro
  await expect(page).toHaveURL(/.*login/);
  await expect(page).toHaveScreenshot('03-after-registration.png');
});
