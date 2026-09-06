import { categories } from "../data/categories";

export function getFilterOptions(filterDef, accounts) {
  if (filterDef.options) return filterDef.options;

  if (filterDef.optionsKey === "categories") return categories.map((c) => c.id);

  if (filterDef.optionsKey === "subCategories") {
    const subs = new Set();
    accounts.forEach((a) => a.subCategory && subs.add(a.subCategory));
    return Array.from(subs).sort();
  }

  if (filterDef.optionsKey === "tags") {
    const tags = new Set();
    accounts.forEach((a) => (a.tags || []).forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }

  return [];
}
