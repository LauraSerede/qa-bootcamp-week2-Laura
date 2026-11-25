import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  reporter: "list",
  retries: 1,
  use: {
    baseURL: process.env.TOOLSHOP_URL ?? "https://practicesoftwaretesting.com",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
