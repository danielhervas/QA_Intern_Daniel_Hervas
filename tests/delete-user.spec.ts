import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

test('Eliminar usuario tras login', async ({ page }) => {
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

  // 2. Ir al RegisterPage
  await loginPage.goToRegisterPage();

  // 3. Registrar nuevo usuario
  await registerPage.register(firstName, lastName, username, password);

    // 3) Espero a que acabe de redirigir a /#/login
  await page.waitForURL(/#\/login$/, { timeout: 5000 });
  // (Opcional) recargo para asegurar estado limpio
  await loginPage.goto();

  // 4) Hago login pulsando Enter
  await loginPage.login(username, password);

  // 5. Esperar a que el HomePage esté cargado (más confiable que solo URL)
//   const usersTitle = page.locator('h3.ng-scope', { hasText: 'All registered users:' });
//   await expect(usersTitle).toBeVisible({ timeout: 10000 });

  // 6. Confirmar que el usuario está visible en la lista
  const userRow = page.locator('li.ng-binding', { hasText: username });
  await expect(userRow).toBeVisible({ timeout: 10000 });

  // 7. Eliminar usuario
  await homePage.deleteUser(username);

  // 8. Confirmar que ya no está
  await expect(userRow).toHaveCount(0);
});
