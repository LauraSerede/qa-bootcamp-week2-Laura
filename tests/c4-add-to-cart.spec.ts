import { test, expect } from '@playwright/test';

const API = 'https://api.practicesoftwaretesting.com';
const headers = { Accept: 'application/json' };

let cartId: string | undefined;

test.afterEach(async ({ request }) => {
  if (cartId) {
    const deleteResponse = await request.delete(`${API}/carts/${cartId}`, { headers });
    cartId = undefined;
    expect(deleteResponse.status()).toBe(204);
  }
});

test('C4 Add to a cart', async ({ request }) => {
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

  const cartResponse = await request.get(`${API}/carts/${cartId}`, { headers });
  expect(cartResponse.status()).toBe(200);
  const cart = await cartResponse.json();
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0].product_id).toBe(product.id);
  expect(cart.cart_items[0].quantity).toBe(2);
});

test('C5 Unknown cart', async ({ request }) => {
  const response = await request.get(`${API}/carts/abc123`, { headers });

  expect(response.status()).toBe(404);
  expect((await response.json()).message).toBe('Requested item not found');
});
