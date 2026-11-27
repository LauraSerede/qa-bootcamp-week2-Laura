import 'dotenv/config';
import { After, Before, Given, Then, When, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect, type Browser, type Page } from '@playwright/test';

const BASE_URL = process.env.TOOLSHOP_URL ?? 'https://practicesoftwaretesting.com';

// The public site can be slow, so give each step up to 60 seconds.
setDefaultTimeout(60_000);

let browser: Browser;
let page: Page;

// Each scenario gets a fresh browser, so it starts with an empty cart.
Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

// Close the browser after every scenario, even if a step failed.
After(async () => {
  await browser.close();
});

Given('I am on the Toolshop home page', async () => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('menuitem', { name: 'Home' })).toBeVisible();
});

Given('my cart is empty', async () => {
  // The cart icon only appears in the menu once the cart has something in it.
  await expect(page.getByRole('menuitem', { name: 'cart' })).toHaveCount(0);
});

When('I open the {string} product page', async (productName: string) => {
  await page.getByRole('heading', { name: productName, level: 5 }).click();
  await expect(page.getByRole('heading', { name: productName, level: 1 })).toBeVisible();
});

When('I add it to my cart', async () => {
  await page.getByRole('button', { name: 'Add to cart' }).click();
});

Then('I see the message {string}', async (message: string) => {
  await expect(page.getByRole('alert').filter({ hasText: message })).toBeVisible();
});

Then('the cart icon shows {int} item', async (count: number) => {
  await expect(page.getByRole('menuitem', { name: 'cart' })).toContainText(String(count));
});
