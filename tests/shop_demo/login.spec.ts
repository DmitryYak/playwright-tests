import { test, expect } from "@playwright/test";

const urlMain = "https://www.saucedemo.com/";

test.describe("SauceDemo Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(urlMain);
    await expect(page.locator(".login_logo")).toBeVisible();
  });

  test(`check login positive`, async ({ page }) => {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
  test("check logo", async ({ page }) => {
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });

  test(`check button menu, have buttons`, async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();
    await expect(
      page.locator('[data-test="inventory-sidebar-link"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-test="about-sidebar-link"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-test="logout-sidebar-link"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-test="reset-sidebar-link"]')
    ).toBeVisible();
  });
});
