import { useState, useMemo } from "react";
import CategoryFilter from "./CategoryFilter";
import MultiSelectFilter from "./MultiSelectFilter";
import { filterDefinitions } from "../../data/filters";
import { getFilterOptions } from "../../utils/filterOptions";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, TYPE_OPTIONS } from "../../types";
import Icon from "../Icon/Icon";
import "./FilterPanel.css";

export default function FilterPanel({
  activeFilters,
  updateFilter,
  onClearAll,
  hasActiveFilters,
  accounts,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = useMemo(() => STATUS_OPTIONS, []);
  const priorityOptions = useMemo(() => PRIORITY_OPTIONS, []);
  const typeOptions = useMemo(() => TYPE_OPTIONS, []);
  const tagOptions = useMemo(() => getFilterOptions({ key: "tags", optionsKey: "tags" }, accounts), [accounts]);

  const selectedSearch = activeFilters.search || [];

  return (
    <div className="filter-panel">
      <button
        type="button"
        className="filter-panel-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Icon name="Filter" size={16} />
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-panel-badge" />}
      </button>

      {isOpen && (
        <div className="filter-panel-body">
          <div className="filter-panel-section">
            <CategoryFilter
              selectedValues={activeFilters.category || []}
              onChange={(values) => updateFilter("category", values)}
              allAccounts={accounts}
            />
          </div>

          <div className="filter-panel-section">
            <MultiSelectFilter
              label="Status"
              options={statusOptions}
              selectedValues={activeFilters.status || []}
              onChange={(values) => updateFilter("status", values)}
            />
          </div>

          <div className="filter-panel-section">
            <MultiSelectFilter
              label="Priority"
              options={priorityOptions}
              selectedValues={activeFilters.priority || []}
              onChange={(values) => updateFilter("priority", values)}
            />
          </div>

          <div className="filter-panel-section">
            <MultiSelectFilter
              label="Type"
              options={typeOptions}
              selectedValues={activeFilters.type || []}
              onChange={(values) => updateFilter("type", values)}
            />
          </div>

          <div className="filter-panel-section">
            <MultiSelectFilter
              label="Tags"
              options={tagOptions}
              selectedValues={activeFilters.tags || []}
              onChange={(values) => updateFilter("tags", values)}
            />
          </div>

          <div className="filter-panel-section">
            <MultiSelectFilter
              label="Sub-category"
              options={getFilterOptions({ key: "subCategory", optionsKey: "subCategories" }, accounts)}
              selectedValues={activeFilters.subCategory || []}
              onChange={(values) => updateFilter("subCategory", values)}
            />
          </div>

          {hasActiveFilters && (
            <div className="filter-panel-section">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onClearAll}
                style={{ alignSelf: "flex-start" }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}