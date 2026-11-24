import { test, expect } from '@playwright/test';

test('invalid login is rejected with an error message', async ({ page }) => {
  await page.goto('/auth/login', { waitUntil: 'domcontentloaded' });

  await page.getByRole('textbox', { name: 'Email address' }).fill('wrong@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword1!');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
