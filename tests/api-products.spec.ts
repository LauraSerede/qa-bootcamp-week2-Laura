import { test, expect } from '@playwright/test';

test('GET /products returns the first page of products', async ({ request }) => {
  const response = await request.get('https://api.practicesoftwaretesting.com/products', {
    headers: { Accept: 'application/json' },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.current_page).toBe(1);
  // current_page alone would pass for an empty page, so check real products came back.
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0].name).toBeTruthy();
});
