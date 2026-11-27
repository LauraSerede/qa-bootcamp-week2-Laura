import { test, expect } from '@playwright/test';
import { join } from 'path';
import { pathToFileURL } from 'url';

const drillPage = pathToFileURL(join(__dirname, 'index.html')).href;

test('Save shows the Saved message', async ({ page }) => {
  await page.goto(drillPage);
  await page.getByRole('button', { name: 'Save' }).click();

  await page.waitForTimeout(500);
  const message = await page.getByRole('paragraph').textContent();

  expect(message).toBe('Saved');
});
