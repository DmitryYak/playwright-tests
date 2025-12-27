import { test, expect } from "@playwright/test";
const urlMain = "https://playwright.dev/";

const elements = [
  {
    locator: (page) =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
  },
  {
    locator: (page) => page.getByRole("link", { name: "Docs" }),
  },
  {
    locator: (page) => page.getByRole("link", { name: "API" }),
  },
  {
    locator: (page) => page.getByRole("button", { name: "Node.js" }),
  },
  {
    locator: (page) => page.getByRole("link", { name: "Community" }),
  },
  {
    locator: (page) => page.getByRole("link", { name: "GitHub repository" }),
  },
  {
    locator: (page) => page.getByRole("button", { name: "Search (Ctrl+K)" }),
  },
];

test.describe("check the main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(urlMain);
  });

  test("check navigation in header", async ({ page }) => {
    elements.forEach(({ locator }) => {
      test.step("check element navigation of header", async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });

    // await expect.soft(page.getByRole("link", { name: "Docs" })).toBeVisible();
    // await expect.soft(page.getByRole("link", { name: "API" })).toBeVisible();
    // await expect
    //   .soft(page.getByRole("button", { name: "Node.js" }))
    //   .toBeVisible();
    // await expect
    //   .soft(page.getByRole("link", { name: "Community" }))
    //   .toBeVisible();
    // await expect
    //   .soft(page.getByRole("link", { name: "GitHub repository" }))
    //   .toBeVisible();
    // await expect
    //   .soft(page.getByRole("button", { name: "Search (Ctrl+K)" }))
    //   .toBeVisible();
  });

  test(`check names elements`, async ({ page }) => {
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
    await page.getByLabel("Switch between dark and light").click();
    await page.waitForTimeout(500);
    await expect
      .soft(page.locator("html"))
      .toHaveAttribute("data-theme", "light");
  });

  test(`check heading in the main page`, async ({ page }) => {
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

  test.skip(`check skip`, async ({ page }) => {
    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toBeVisible();
  });

  test.fixme(`check fixme`, async ({ page }) => {
    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toBeVisible();
  });

  test.fail(`check fail`, async ({ page }) => {
    await expect
      .soft(page.getByRole("link", { name: "Get startedFFFFFF" }))
      .toBeVisible();
  });

  // test.only(`check only --- Only this test`, async ({ page }) => {
  //   await expect
  //     .soft(page.getByRole("link", { name: "Get started" }))
  //     .toBeVisible();
  // });
});
