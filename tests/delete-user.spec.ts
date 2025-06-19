import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

test('Eliminar usuario tras registro y login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const homePage = new HomePage(page);

  const timestamp = Date.now();
  const username = `user_${timestamp}`;
  const password = 'Test123!';
  const firstName = 'Mario';
  const lastName = 'Gómez';

  // 1. Ir al LoginPage
  await loginPage.goto();
  await expect(page).toHaveScreenshot('01-login-page.png');

  // 2. Ir al RegisterPage
  await loginPage.goToRegisterPage();
  await expect(page).toHaveScreenshot('02-register-page.png');

  // 3. Registrar nuevo usuario
  await registerPage.register(firstName, lastName, username, password);

  // 3) Espero a que acabe de redirigir a /#/login
  await page.waitForURL(/#\/login$/, { timeout: 5000 });
  await expect(page).toHaveScreenshot('03-after-registration-login-page.png');
  
  // recargo para asegurar estado limpio
  await loginPage.goto();
  await expect(page).toHaveScreenshot('04-login-page-reloaded.png');

  // 4) Hago login pulsando Enter
  await loginPage.login(username, password);

  // 5. Confirmar que el usuario está visible en la lista
  const userRow = page.locator('li.ng-binding', { hasText: username });
  await expect(userRow).toBeVisible({ timeout: 10000 });
  await expect(page).toHaveScreenshot('05-logged-in-homepage.png');

  // 6. Eliminar usuario
  await homePage.deleteUser(username);
  await expect(page).toHaveScreenshot('06-after-deleting-user.png');

  // 7. Confirmar que ya no está
  await expect(userRow).toHaveCount(0);
});
