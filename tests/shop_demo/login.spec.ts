import { test, expect } from "@playwright/test";

const urlMain = "https://www.saucedemo.com/";

test.describe("SauceDemo Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(urlMain);
    await expect(page.locator(".login_logo")).toBeVisible(); // ← ТОЧКА!
  });

  test("positive login", async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
  });
});
