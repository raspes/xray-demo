import { test, expect } from "@playwright/test";

test.describe("Demo Suite — Xray CI/CD Integration", () => {
  test("TC-01: La página principal carga correctamente", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.locator("text=Get started")).toBeVisible();
  });

  test("TC-02: El botón Get Started navega a la documentación", async ({
    page,
  }) => {
    await page.goto("https://playwright.dev/");
    await page.locator("text=Get started").first().click();
    await expect(page).toHaveURL(/.*intro/);
  });

  test("TC-03: La barra de búsqueda está disponible", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.waitForLoadState("networkidle");
    const searchButton = page.getByRole("button", { name: /search/i });
    await expect(searchButton).toBeVisible();
  });

  test("TC-04: FALLA INTENCIONAL — Título incorrecto para demostrar fallo", async ({
    page,
  }) => {
    await page.goto("https://playwright.dev/");
    // Este test falla a propósito — para mostrar FAILED con evidencia en Xray
    await expect(page).toHaveTitle("Este título no existe", { timeout: 5000 });
  });
});
