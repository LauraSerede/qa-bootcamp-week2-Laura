import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/product-page';

// Case 7 from my automation sorting table: "Choose a valid quantity (5) and add to cart".
test('adding a valid quantity of 5 puts 5 items in the cart', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.open('Combination Pliers');
  await productPage.setQuantity(5);
  await productPage.addToCart();

  await expect(productPage.cartIcon).toHaveText('5');
});
