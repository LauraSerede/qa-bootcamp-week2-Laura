import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/search-page';

test('C1 Search by name', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search('pliers');

  await expect(searchPage.resultsHeading('pliers')).toBeVisible();

  await expect(async () => {
    const names = await searchPage.productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain('pliers');
    }
  }).toPass({ timeout: 10_000 });
});
