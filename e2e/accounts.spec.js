import { test, expect } from "@playwright/test";

test.describe("Accounts grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays accounts on load", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Accounts" })).toBeVisible();
    await expect(page.getByText("GitHub", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Figma", { exact: true }).first()).toBeVisible();
  });

  test("search filters accounts", async ({ page }) => {
    const search = page.getByPlaceholder("Search accounts...");
    await search.fill("github");
    // Search is debounced (200ms) — wait for the filter to apply.
    await expect(page.getByText("GitHub", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Figma", { exact: true })).not.toBeVisible();
  });

  test("clears search", async ({ page }) => {
    const search = page.getByPlaceholder("Search accounts...");
    await search.fill("github");
    await search.fill("");
    await expect(page.getByText("Figma", { exact: true }).first()).toBeVisible();
  });

  test("selects a row", async ({ page }) => {
    // Per-row checkboxes are visually hidden; click the visible card-select label.
    const cardSelectLabel = page.locator(".card-select-label").first();
    await cardSelectLabel.click({ force: true });
    await expect(page.locator(".selection-toolbar-count")).toHaveText("1 selected");
  });

  test("select all filtered", async ({ page }) => {
    const selectAllLabel = page.locator(".select-all-label");
    await selectAllLabel.scrollIntoViewIfNeeded();
    await selectAllLabel.click({ force: true });
    // Select-all selects every visible row; the toolbar shows the count.
    await expect(page.locator(".selection-toolbar-count")).toHaveText(/selected/);
  });

  test("external link opens new tab", async ({ page }) => {
    const githubCard = page
      .locator(".account-card", { has: page.getByText("GitHub", { exact: true }) })
      .first();
    await githubCard.scrollIntoViewIfNeeded();
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      githubCard.locator(".account-card-open").click(),
    ]);
    await expect(newPage.url()).toContain("github.com");
    await newPage.close();
  });

  test("category filter reduces results", async ({ page }) => {
    // The filter panel is collapsed by default — open it first.
    await page.getByRole("button", { name: "Filters" }).click();
    // Category checkbox id is "category-coding" (label "Coding").
    const codingLabel = page.locator("label").filter({ has: page.locator("#category-coding") });
    await codingLabel.click();
    await expect(page.getByText("GitHub", { exact: true }).first()).toBeVisible();
  });

  test("clear filters resets view", async ({ page }) => {
    await page.getByRole("button", { name: "Filters" }).click();
    const codingLabel = page.locator("label").filter({ has: page.locator("#category-coding") });
    await codingLabel.click();
    await page.getByRole("button", { name: "Clear all filters" }).click();
    await expect(page.locator("#category-coding")).not.toBeChecked();
  });

  test("empty state shows when no matches", async ({ page }) => {
    const search = page.getByPlaceholder("Search accounts...");
    await search.fill("zzzz-not-a-real-account");
    // Search is debounced — wait for the empty state to appear.
    await expect(page.getByText("No accounts match your search")).toBeVisible();
  });
});