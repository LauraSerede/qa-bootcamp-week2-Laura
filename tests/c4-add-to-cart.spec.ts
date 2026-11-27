import { test, expect } from '@playwright/test';

const API = 'https://api.practicesoftwaretesting.com';
const headers = { Accept: 'application/json' };

// The id of a cart created by the current test, so afterEach can delete it.
let cartId: string | undefined;

// Runs after every test, even when a check fails, so no cart is left behind.
test.afterEach(async ({ request }) => {
  if (cartId) {
    const deleteResponse = await request.delete(`${API}/carts/${cartId}`, { headers });
    cartId = undefined;
    // Make a failed cleanup visible instead of silently leaving data behind.
    expect(deleteResponse.status()).toBe(204);
  }
});

test('C4 Add to a cart', async ({ request }) => {
  // Product ids change, so look one up instead of hard-coding it.
  const productsResponse = await request.get(`${API}/products`, { headers });
  expect(productsResponse.status()).toBe(200);
  const products = await productsResponse.json();
  const product = products.data.find((p: { in_stock: boolean }) => p.in_stock);

  const createResponse = await request.post(`${API}/carts`, { headers });
  expect(createResponse.status()).toBe(201);
  cartId = (await createResponse.json()).id;

  const addResponse = await request.post(`${API}/carts/${cartId}`, {
    headers,
    data: { product_id: product.id, quantity: 2 },
  });
  expect(addResponse.status()).toBe(200);

  // Read the cart back to prove the product was really added.
  const cartResponse = await request.get(`${API}/carts/${cartId}`, { headers });
  expect(cartResponse.status()).toBe(200);
  const cart = await cartResponse.json();
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0].product_id).toBe(product.id);
  expect(cart.cart_items[0].quantity).toBe(2);
});

// Extra check: C5 creates no data, so it sits alongside C4 rather than standing alone.
test('C5 Unknown cart', async ({ request }) => {
  // Real cart ids are 26-character codes, so "abc123" can never match a real cart.
  const response = await request.get(`${API}/carts/abc123`, { headers });

  expect(response.status()).toBe(404);
  expect((await response.json()).message).toBe('Requested item not found');
});
