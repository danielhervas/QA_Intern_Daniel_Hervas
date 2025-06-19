// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

test('Registro, login y logout de un usuario', async ({ page }) => {
  const loginPage    = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const homePage     = new HomePage(page);

  const username  = `user_${Date.now()}`;
  const password  = 'Test123!';
  const firstName = 'Laura';
  const lastName  = 'López';

  // 1) Voy a login
  await loginPage.goto();

  // 2) Voy a register y creo el usuario
  await loginPage.goToRegisterPage();
  await registerPage.register(firstName, lastName, username, password);

  // 3) Espero a que acabe de redirigir a /#/login
  await page.waitForURL(/#\/login$/, { timeout: 5000 });
  // (Opcional) recargo para asegurar estado limpio
  await loginPage.goto();

  // 4) Hago login pulsando Enter
  await loginPage.login(username, password);

  // 5) Espero a que aparezca Logout en HomePage
  await expect(homePage.logoutButton).toBeVisible({ timeout: 10_000 });

  // 6) Hago logout
  await homePage.logout();

  // 7) Verifico redirección al login
  await expect(page).toHaveURL(/#\/login$/, { timeout: 5_000 });
});
