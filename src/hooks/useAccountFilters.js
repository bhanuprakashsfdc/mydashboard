import { useState, useCallback, useMemo } from "react";
import { filterAccounts } from "../utils/filtering";
import { sortAccounts } from "../utils/filtering";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useState(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useAccountFilters(accounts) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [sortState, setSortState] = useState({ id: "name", desc: false });

  const debouncedSearch = useDebounce(searchQuery, 200);

  const filteredAccounts = useMemo(
    () =>
      filterAccounts(accounts, activeFilters, debouncedSearch),
    [accounts, activeFilters, debouncedSearch]
  );

  const sortedAccounts = useMemo(
    () => sortAccounts(filteredAccounts, sortState),
    [filteredAccounts, sortState]
  );

  const updateFilter = useCallback((key, values) => {
    setActiveFilters((prev) => {
      if (!values || values.length === 0) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: values };
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
    setSearchQuery("");
  }, []);

  const hasActiveFilters =
    Object.values(activeFilters).some((arr) => arr && arr.length > 0) ||
    searchQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    activeFilters,
    updateFilter,
    clearAllFilters,
    hasActiveFilters,
    filteredAccounts,
    sortedAccounts,
    sortState,
    setSortState,
  };
}
