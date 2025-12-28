import { test, expect, Page, Locator } from "@playwright/test";
const urlMain = "https://playwright.dev/";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo link",
    text: "Playwright",
    attribute: {
      type: "href",
      value: "/",
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole("link", { name: "Docs" }),
    name: "Docs link",
    text: "Docs",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole("link", { name: "API" }),
    name: "API link",
    text: "API",
    attribute: {
      type: "href",
      value: "/docs/api/class-playwright",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: "Node.js" }),
    name: "Node.js button",
    text: "Node.js",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Community" }),
    name: "Community link",
    text: "Community",
    attribute: {
      type: "href",
      value: "/community/welcome",
    },
  },
  {
    locator: (page: Page): Locator => page.getByLabel("GitHub repository"),
    name: "GitHub icon",
    attribute: {
      type: "href",
      value: "https://github.com/microsoft/playwright",
    },
  },
  {
    locator: (page: Page): Locator => page.getByLabel("Discord server"),
    name: "Discord icon",
    attribute: {
      type: "href",
      value: "https://aka.ms/playwright/discord",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByLabel("Switch between dark and light"),
    name: "Lightmode icon",
  },
  {
    locator: (page: Page): Locator => page.getByLabel("Search (Ctrl+K)"),
    name: "Search input",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    name: "Playwright enables reliable end-to-end testing for modern web apps.",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Get started" }),
    name: "Get started button",
    text: "Get started",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
];

test.describe("check the main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(urlMain);
  });

  test("check navigation in header", async ({ page }) => {
    for (const { locator, name } of elements) {
      await test.step(`check element navigation of header ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });

  test("check names elements", async ({ page }) => {
    for (const { locator, name, text } of elements) {
      if (!text) continue;

      await test.step(`check name elements ${name}`, async () => {
        await expect(locator(page)).toContainText(text!);
      });
    }
  });

  test(`check href elements of navigation header`, async ({ page }) => {
    for (const { locator, name, attribute } of elements) {
      if (!attribute) continue;
      await test.step(`check href elements ${name}`, async () => {
        await expect(locator(page)).toHaveAttribute(
          attribute?.type,
          attribute?.value
        );
      });
    }
  });

  test(`check dark lite mode`, async ({ page }) => {
    await page.getByLabel("Switch between dark and light").click();
    await expect
      .soft(page.locator("html"))
      .toHaveAttribute("data-theme", "light");
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
  const lightMods = ["ligth", "dark"];

  lightMods.forEach((value) => {
    test(`check stiles active ${value} mode`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector("html")?.setAttribute("data-theme", value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith ${value} Mode.png`);
    });
  });
});
