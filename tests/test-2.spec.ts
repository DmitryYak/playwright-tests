import { test, expect } from "@playwright/test";
const urlMain = "https://playwright.dev/";

test("check navigation in header", async ({ page }) => {
  await page.goto(urlMain);
  await expect
    .soft(page.getByRole("link", { name: "Playwright logo Playwright" }))
    .toBeVisible();
  await expect.soft(page.getByRole("link", { name: "Docs" })).toBeVisible();
  await expect.soft(page.getByRole("link", { name: "API" })).toBeVisible();
  await expect
    .soft(page.getByRole("button", { name: "Node.js" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "Community" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "GitHub repository" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("button", { name: "Search (Ctrl+K)" }))
    .toBeVisible();
});

test(`check names elements`, async ({ page }) => {
  await page.goto(urlMain);
  await expect
    .soft(page.getByRole("link", { name: "Playwright logo Playwright" }))
    .toContainText("Playwright");

  await expect
    .soft(page.getByRole("link", { name: "Docs" }))
    .toContainText("Docs");
  await expect
    .soft(page.getByRole("link", { name: "API" }))
    .toContainText("API");
  await expect
    .soft(page.getByRole("button", { name: "Node.js" }))
    .toContainText("Node.js");
  await expect(page.getByRole("link", { name: "Community" })).toContainText(
    "Community"
  );
});

test(`check href elements of navigation header`, async ({ page }) => {
  await page.goto(urlMain);
  await expect
    .soft(page.getByRole("link", { name: "Playwright logo Playwright" }))
    .toHaveAttribute("href", "/");

  await expect
    .soft(page.getByRole("link", { name: "Docs" }))
    .toHaveAttribute("href", "/docs/intro");
  await expect
    .soft(page.getByRole("link", { name: "API" }))
    .toHaveAttribute("href", "/docs/api/class-playwright");
  await expect
    .soft(page.getByRole("link", { name: "Community" }))
    .toHaveAttribute("href", "/community/welcome");
});

test(`check dark lite mode`, async ({ page }) => {
  await page.goto(urlMain);
  await page.getByLabel("Switch between dark and light").click();
  await page.waitForTimeout(500);
  await expect
    .soft(page.locator("html"))
    .toHaveAttribute("data-theme", "light");
});

test(`check heading in the main page`, async ({ page }) => {
  await page.goto(urlMain);
  await page;
  await expect
    .soft(page.getByRole("heading", { name: "Playwright enables reliable" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("heading", { name: "Playwright enables reliable" }))
    .toContainText(
      "Playwright enables reliable end-to-end testing for modern web apps."
    );
});

test(`check button Get started`, async ({ page }) => {
  await page.goto(urlMain);

  await expect
    .soft(page.getByRole("link", { name: "Get started" }))
    .toBeVisible();
  await expect
    .soft(page.getByRole("link", { name: "Get started" }))
    .toContainText("Get started");
  await expect
    .soft(page.getByRole("link", { name: "Get started" }))
    .toHaveAttribute("href", "/docs/intro");
});
