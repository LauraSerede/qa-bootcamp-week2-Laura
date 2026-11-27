# QA Bootcamp Week 2: Toolshop test suite

A Playwright test suite for [Toolshop](https://practicesoftwaretesting.com), with UI tests that drive the website in a browser and API tests that call the Toolshop API directly.

## Prerequisites

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)

Clone the repo and open the folder:

```bash
git clone https://github.com/LauraSerede/qa-bootcamp-week2-Laura.git
cd qa-bootcamp-week2-Laura
```

## Run the suite in three steps

1. **Install** the dependencies and the Chromium browser:

   ```bash
   npm install
   npx playwright install chromium
   ```

2. **Copy** `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   `.env` holds the Toolshop website and API URLs. You don't need to change them.

3. **Run** the tests:

   ```bash
   npm test
   ```

   All 7 tests should pass. To watch the UI tests in a browser, run `npx playwright test --headed`.

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it.

If tests fail with `403` or `404` errors from `api.practicesoftwaretesting.com`, check that <https://api.practicesoftwaretesting.com/products> shows product data. The public API is sometimes down, and the login and search UI tests depend on it too.

## What's in the suite

| File | Type | What it checks |
| ---- | ---- | -------------- |
| `tests/c1-search-by-name.spec.ts` | UI (page object) | **Capstone C1:** a search for "pliers" returns only products with "pliers" in the name |
| `tests/c4-add-to-cart.spec.ts` | API | **Capstone C4:** a new cart returns 201, adding a product returns 200, and the cart then contains that product. **C5:** an unknown cart id returns 404. Every cart is deleted afterwards, even if the test fails. |
| `tests/home.spec.ts` | UI | The home page has the expected title |
| `tests/login.spec.ts` | UI (page object) | An invalid login shows "Invalid email or password" |
| `tests/add-to-cart.spec.ts` | UI (page object) | Adding a quantity of 5 to the cart shows 5 items in the cart |
| `tests/api-products.spec.ts` | API | GET /products returns 200 and a first page that contains products |

## Capstone

### Case choices (two gates)

Gate one: can it be automated reliably? Gate two: is it worth automating?

| Case | Gate one: reliable? | Gate two: worth it? | Decision and reason |
| ---- | ------------------- | ------------------- | ------------------- |
| C1 Search by name (UI) | Yes. "Pliers" products are stable shop data, and the results can be waited for with a condition (the "Searched for" heading and a retrying check). | Yes. Search is a core journey that every shopper uses, and checking every result by hand is slow. | **Automate now (UI case).** Highest-value UI journey with a clear, meaningful assertion. |
| C2 Filter by category (UI) | Partly. Results span 3 pages, so the test must page through and depends on how many products each subcategory holds. | Medium. Filtering matters, but is used less than search. | **Later.** Needs stable test data and a page-count or last-page check before it is reliable. |
| C3 Sort by price (UI) | Yes, with care. I saw the list redraw a few seconds after choosing the sort, so a check that reads too early gives a false result. | Medium. Useful, but less critical than search. | **Later.** Automatable with a retrying assertion that compares neighbouring prices, but lower value than C1. |
| C4 Add to a cart (API) | Yes. The test creates its own cart, looks up a product id at runtime, and deletes the cart afterwards. | Yes. Adding to the cart comes before every purchase, and the API test is fast. | **Automate now (API case).** Creates and cleans up its own data, as the brief requires. |
| C5 Unknown cart (API) | Yes. "abc123" can never match a real 26-character cart id. | Yes, as an extra negative check. | **Automate now as an extra check.** It creates no data, so it can't be the API case on its own. |
| C6 Missing quantity (API) | Yes. It returns 422 "The quantity field is required." | Medium. A validation rule that rarely changes and is quick to check in Postman. | **Later.** Good next API test after C4, since it uses the same cart setup and cleanup. |

### Test-design notes

#### C1 Search by name (UI)

- Expected result: after searching for "pliers", at least one product is shown and every product name contains "pliers".
- Test data: the search term "pliers". The shop currently has 4 matching products, but the test does not depend on the exact number.
- Could pass when it should fail: if the test read the product names before the search finished, or found no products at all, a loop over the names would have nothing to check and pass. The test waits for the "Searched for: pliers" heading and requires at least one result to prevent this.
- Could fail when it should pass: if the site is slow, the old unfiltered list may still be showing when the names are first read. The check retries with `toPass()` until the results have updated, instead of using a fixed wait.

#### C4 Add to a cart (API)

- Expected result: creating a cart returns 201, adding a product returns 200, and reading the cart back shows exactly one item with that product id and a quantity of 2.
- Test data: a new cart created by the test, and the first in-stock product looked up from `/products` at runtime. The cart is deleted afterwards.
- Could pass when it should fail: checking only the 200 status of the add request would pass even if nothing was stored. The test reads the cart back to prove the product was really added.
- Could fail when it should pass: a hard-coded product id would break when the shop's data is reset, because product ids change. The test looks the id up each run. A leftover cart from an earlier run cannot interfere, because each run creates its own cart.

## Cucumber (BDD) scenario

One example in `features/cart.feature`, "Add one product to the cart", is tagged `@automated` and connected to step definitions in `features/step-definitions/cart.steps.ts`. The step definitions use Playwright to drive a real browser. Run it with:

```bash
npm run bdd
```

It should report `1 scenario (1 passed)`. The other examples in the feature file are descriptions only and are not run.

## Folders

| Folder | What it is for |
| ------ | -------------- |
| `tests/` | The Playwright tests. |
| `tests/pages/` | Page objects. `login-page.ts` and `product-page.ts` hold each page's locators and actions. |
| `features/` | Gherkin feature files. `cart.feature` describes the cart flow in plain language. |
| `features/step-definitions/` | Cucumber-js step definitions that connect the feature file to Playwright. |
| `src/` | TypeScript practice exercises from Day 6. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm run check`: checks your `.env` and that you can reach the Toolshop API.
- `npm test`: runs the Playwright tests in `tests/`.

## Week 2 Day 6: TypeScript basics

### `src/ts-basics/`

Practice files for core TypeScript features:

- `functions.ts`: typed parameters, default values and return types
- `objects.ts`: object types with `readonly` properties and methods
- `type-aliases.ts`: reusable object types with `type`
- `union-types.ts`: `number | string` parameters and narrowing with `typeof`
- `optional-chaining.ts`: safe access with `?.` on values that may be null or undefined
- `tuples.ts`: fixed-length arrays where each position has its own type

### `src/profile-validator.ts`

Reads a user's `notifications` setting safely when `settings` or `notifications` might be missing. It uses `?.` and `?? false`, so it never throws at runtime.

Run it with:

```bash
npx tsx src/profile-validator.ts
```
