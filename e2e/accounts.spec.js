import { test, expect } from "@playwright/test";

test.describe("Accounts grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays accounts on load", async ({ page }) {
    await expect(page.locator("text=GitHub")).toBeVisible();
    await expect(page.locator("text=Accounts")).toBeVisible();
  });

  test("search filters accounts", async ({ page }) => {
    const search = page.locator('input[placeholder="Search accounts..."]');
    await search.fill("github");
    await expect(page.locator("text=GitHub")).toBeVisible();
    await expect(page.locator("text=Figma")).not.toBeVisible();
  });

  test("clears search", async ({ page }) => {
    const search = page.locator('input[placeholder="Search accounts..."]');
    await search.fill("github");
    await search.fill("");
    await expect(page.locator("text=Figma")).toBeVisible();
  });

  test("selects a row", async ({ page }) => {
    await page.getByLabel("Select").first().check();
    await expect(page.locator("text=1 selected")).toBeVisible();
  });

  test("select all filtered", async ({ page }) => {
    const selectAll = page.locator("#select-all");
    await selectAll.check();
    await expect(page.locator("text=selected")).toBeVisible();
  });

  test("external link opens new tab", async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      page.getByRole("link", { name: "Open" }).first().click(),
    ]);
    await expect(newPage.url()).toContain("github.com");
    await newPage.close();
  });

  test("category filter reduces results", async ({ page }) => {
    await page.getByLabel("coding").check();
    await expect(page.locator("text=GitHub")).toBeVisible();
  });

  test("clear filters resets view", async ({ page }) => {
    await page.getByLabel("coding").check();
    await page.getByRole("button", { name: "Clear all filters" }).click();
    await expect(page.getByLabel("coding")).not.toBeChecked();
  });

  test("empty state shows when no matches", async ({ page }) => {
    const search = page.locator('input[placeholder="Search accounts..."]');
    await search.fill("zzzz-not-a-real-account");
    await expect(page.locator("text=No accounts match your search")).toBeVisible();
  });
});
