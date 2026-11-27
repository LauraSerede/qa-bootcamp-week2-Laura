import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityInput = page.getByRole('spinbutton', { name: 'Quantity' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    // The cart icon only appears in the menu once the cart has something in it.
    this.cartIcon = page.getByRole('menuitem', { name: 'cart' });
  }

  async open(productName: string) {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('heading', { name: productName, level: 5 }).click();
    // Wait for the product page itself, not a fixed time.
    await this.page.getByRole('heading', { name: productName, level: 1 }).waitFor();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
