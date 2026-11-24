import { test, expect } from '@playwright/test';

test('searching for "pliers" returns only pliers', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search', exact: true }).click();

  // Each product name in the results is a level-5 heading.
  const productNames = page.getByRole('heading', { level: 5 });

  // Results load after the search, so retry until every name contains "pliers".
  await expect(async () => {
    const names = await productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain('pliers');
    }
  }).toPass();
});
