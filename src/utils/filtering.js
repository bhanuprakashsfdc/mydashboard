import { filterDefinitions } from "../data/filters";

export function matchesSearch(account, query) {
  if (!query || !query.trim()) return true;
  const lower = query.toLowerCase();
  const fields = filterDefinitions.find((f) => f.key === "search")?.fields || [];
  return fields.some((field) => {
    const value = account[field];
    if (Array.isArray(value)) {
      return value.some((item) => String(item).toLowerCase().includes(lower));
    }
    return String(value ?? "").toLowerCase().includes(lower);
  });
}

export function matchesFilters(account, activeFilters) {
  return filterDefinitions.every((filter) => {
    if (filter.key === "search") return true;
    const selected = activeFilters[filter.key];
    if (!selected || selected.length === 0) return true;

    if (filter.type === "boolean") {
      return account[filter.key] === true;
    }

    const value = account[filter.key];
    if (Array.isArray(value)) {
      return value.some((v) => selected.includes(v));
    }
    return selected.includes(value);
  });
}

export function filterAccounts(accounts, activeFilters, searchQuery) {
  return accounts.filter((account) => {
    if (!matchesSearch(account, searchQuery)) return false;
    if (!matchesFilters(account, activeFilters)) return false;
    return true;
  });
}

export function sortAccounts(accounts, sortState) {
  if (!sortState || !sortState.id) return accounts;
  const { id, desc } = sortState;

  return [...accounts].sort((a, b) => {
    const aVal = a[id];
    const bVal = b[id];

    if (aVal === bVal) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    let comparison = 0;
    if (typeof aVal === "number" && typeof bVal === "number") {
      comparison = aVal - bVal;
    } else if (Array.isArray(aVal) && Array.isArray(bVal)) {
      comparison = String(aVal[0] ?? "").localeCompare(String(bVal[0] ?? ""));
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }

    return desc ? -comparison : comparison;
  });
}
