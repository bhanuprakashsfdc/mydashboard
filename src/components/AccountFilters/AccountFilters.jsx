import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import "./AccountFilters.css";

export default function AccountFilters({
  searchQuery,
  onSearchChange,
  activeFilters,
  updateFilter,
  clearAllFilters,
  hasActiveFilters,
  accounts,
  resultCount,
}) {
  return (
    <div className="account-filters">
      <div className="account-filters-top">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <div className="account-filters-meta">
          <span className="account-filters-count">{resultCount} accounts</span>
        </div>
      </div>
      <FilterPanel
        activeFilters={activeFilters}
        updateFilter={updateFilter}
        onClearAll={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
        accounts={accounts}
      />
    </div>
  );
}
