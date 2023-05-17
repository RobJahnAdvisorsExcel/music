import { test, expect } from "@playwright/test";

test("has header", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByRole("heading", { name: "Add Song" })).toBeVisible();
});

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(
    page.getByRole("heading", { name: "Rob's Songs Baby" })
  ).toBeVisible();
});
