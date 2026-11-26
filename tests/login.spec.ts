import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test('invalid login is rejected with an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wrong@example.com', 'WrongPassword1!');

  await expect(loginPage.errorMessage).toBeVisible();
});
