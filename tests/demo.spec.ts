import { test, expect } from "@playwright/test";

test.describe("Demo Suite — Xray CI/CD Integration", () => {
  test("[XRAY-33] Home page loads correctly", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.locator("text=Get started")).toBeVisible();
  });

  test("[XRAY-34] Get Started button navigates to documentation", async ({
    page,
  }) => {
    await page.goto("https://playwright.dev/");
    await page.locator("text=Get started").first().click();
    await expect(page).toHaveURL(/.*intro/);
  });

  test("[XRAY-35] Search bar is available", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.waitForLoadState("networkidle");
    const searchButton = page.getByRole("button", { name: /search/i });
    await expect(searchButton).toBeVisible();
  });

  test("[XRAY-36] INTENTIONAL FAILURE — Incorrect title to demonstrate failure", async ({
    page,
  }) => {
    await page.goto("https://playwright.dev/");
    // This test fails on purpose — to show FAILED with evidence in Xray
    await expect(page).toHaveTitle("This title does not exist", {
      timeout: 5000,
    });
  });
});
