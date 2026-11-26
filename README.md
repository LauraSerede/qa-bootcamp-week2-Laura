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

   All 6 tests should pass. To watch the UI tests in a browser, run `npx playwright test --headed`.

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it.

If tests fail with `403` or `404` errors from `api.practicesoftwaretesting.com`, check that <https://api.practicesoftwaretesting.com/products> shows product data. The public API is sometimes down, and the login and search UI tests depend on it too.

## What's in the suite

| File | Type | What it checks |
| ---- | ---- | -------------- |
| `tests/home.spec.ts` | UI | The home page has the expected title |
| `tests/search.spec.ts` | UI | A search for "pliers" returns only products with "pliers" in the name |
| `tests/login.spec.ts` | UI (page object) | An invalid login shows "Invalid email or password" |
| `tests/api-products.spec.ts` | API | GET /products returns 200 and the first page |
| `tests/api-carts.spec.ts` | API | A product added to a new cart appears in it, and an unknown cart id returns 404. Every cart a test creates is deleted afterwards, even if the test fails. |

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
| `tests/pages/` | Page objects. `login-page.ts` holds the login page's locators and actions. |
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
