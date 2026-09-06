import { describe, it, expect } from "vitest";
import { filterAccounts, sortAccounts } from "../utils/filtering";
import { validateAccounts, getValidationSummary } from "../utils/validation";
import { accounts } from "../data/data";

describe("filtering", () => {
  it("returns all accounts when no filters applied", () => {
    const result = filterAccounts(accounts, {}, "");
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters by search query", () => {
    const result = filterAccounts(accounts, {}, "github");
    expect(result.some((a) => a.id === "github")).toBe(true);
    expect(result.some((a) => a.name.toLowerCase().includes("github"))).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((a) => {
      const haystack = [a.name, a.description, ...(a.tags || []), ...(a.technology || []), a.notes].join(" ").toLowerCase();
      return haystack.includes("github");
    })).toBe(true);
  });

  it("filters by category", () => {
    const result = filterAccounts(accounts, { category: ["coding"] }, "");
    expect(result.every((a) => a.category === "coding")).toBe(true);
  });

  it("filters by multiple categories (OR)", () => {
    const result = filterAccounts(accounts, { category: ["coding", "ai"] }, "");
    expect(result.some((a) => a.category === "coding")).toBe(true);
    expect(result.some((a) => a.category === "ai")).toBe(true);
  });

  it("applies AND between filter groups", () => {
    const result = filterAccounts(accounts, { category: ["coding"], status: ["active"] }, "");
    expect(result.every((a) => a.category === "coding" && a.status === "active")).toBe(true);
  });

  it("returns empty array when no matches", () => {
    const result = filterAccounts(accounts, { category: ["nonexistent"] }, "");
    expect(result.length).toBe(0);
  });

  it("handles empty search gracefully", () => {
    const result = filterAccounts(accounts, {}, "");
    expect(result.length).toBe(accounts.length);
  });
});

describe("sorting", () => {
  it("sorts by name ascending", () => {
    const result = sortAccounts(accounts, { id: "name", desc: false });
    expect(result[0].name <= result[result.length - 1].name).toBe(true);
  });

  it("sorts by name descending", () => {
    const result = sortAccounts(accounts, { id: "name", desc: true });
    expect(result[0].name >= result[result.length - 1].name).toBe(true);
  });

  it("returns original array when no sort state", () => {
    const result = sortAccounts(accounts, null);
    expect(result).toBe(accounts);
  });
});

describe("validation", () => {
  it("returns no errors for valid accounts", () => {
    const errors = validateAccounts();
    const invalid = errors.filter((e) => e.problems.length > 0);
    expect(invalid.length).toBe(0);
  });

  it("summary is a success message when valid", () => {
    expect(getValidationSummary()).toContain("All accounts are valid");
  });
});
