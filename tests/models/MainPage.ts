import test, { expect, Locator, Page } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "Playwright logo Playwright" }),
        name: "Playwright logo l87 5555555nk",
        text: "Playwright",
        attribute: {
          type: "href",
          value: "/",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "Docs" }),
        name: "Docs link",
        text: "Docs",
        attribute: {
          type: "href",
          value: "/docs/intro",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "API" }),
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
  }
  async openMyPage() {
    await this.page.goto("https://playwright.dev/");
  }
  async checkElementsVisability() {
    for (const { locator, name } of this.elements) {
      await test.step(`check element navigation of header ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
}
