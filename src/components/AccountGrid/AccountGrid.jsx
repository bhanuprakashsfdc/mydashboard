import { useMemo, useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import Checkbox from "../ui/Checkbox";
import AccountCard from "./AccountCard";
import SelectionToolbar from "../SelectionToolbar/SelectionToolbar";
import EmptyState from "../EmptyState";
import "./AccountGrid.css";

export default function AccountGrid({
  accounts,
  pinnedIds = new Set(),
  pinnedCount = 0,
  onUnpinAll,
  selectedIds,
  toggleOne,
  toggleAllFiltered,
  clearSelection,
  isSelected,
  isPinned,
  onPinToggle,
  isAllFilteredSelected,
  isSomeFilteredSelected,
  sortState,
  setSortState,
}) {
  const allFilteredIds = useMemo(() => accounts.map((a) => a.id), [accounts]);

  const requestSort = (columnId) => {
    setSortState((prev) => {
      if (prev && prev.id === columnId) {
        return { id: columnId, desc: !prev.desc };
      }
      return { id: columnId, desc: false };
    });
  };

  return (
    <div className="account-grid-wrapper">
      <SelectionToolbar
        selectedCount={selectedIds.size}
        onClear={clearSelection}
      />
      <div className="account-grid-toolbar">
        <div className="account-grid-toolbar-left">
          <label className="select-all-label">
            <Checkbox
              id="select-all"
              checked={isAllFilteredSelected}
              indeterminate={isSomeFilteredSelected}
              onChange={() => toggleAllFiltered(allFilteredIds)}
            />
            <span className="select-all-text">Select all</span>
          </label>
          {selectedIds.size > 0 && (
            <span className="account-grid-selection-count">
              {selectedIds.size} selected
            </span>
          )}
          {pinnedCount > 0 && (
            <span className="account-grid-pinned-count" title="Pinned accounts stay at the top">
              <Icon name="Pin" size={12} />
              {pinnedCount} pinned
              {onUnpinAll && (
                <button
                  type="button"
                  className="account-grid-unpin-all"
                  onClick={onUnpinAll}
                >
                  Unpin all
                </button>
              )}
            </span>
          )}
        </div>
        <div className="account-grid-toolbar-right">
          <label className="column-visibility-toggle">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 3H13M3 7H11M5 11H9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span>Columns</span>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  document.dispatchEvent(new CustomEvent("toggle-column", { detail: e.target.value }));
                }
              }}
              aria-label="Toggle columns"
            >
              <option value="" disabled>
                Toggle column
              </option>
              {["description", "category", "subCategory", "tags", "status", "priority", "url", "actions"].map((key) => (
                <option key={key} value={key}>
                  Toggle {key}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="account-grid-scroll">
        {accounts.length === 0 ? (
          <div className="account-grid-empty">
            <EmptyState
              title="No accounts match your search"
              description="Try adjusting your search or filters."
              actionLabel="Clear filters"
              onAction={() => {
                document.querySelector<HTMLButtonElement>(".filter-panel-section button")?.click();
              }}
            />
          </div>
        ) : (
          <div className="account-grid-body" role="rowgroup">
            {accounts.map((account, index) => (
              <AccountCard
                key={account.id}
                account={account}
                isSelected={isSelected(account.id)}
                onToggle={toggleOne}
                index={index}
                pinned={isPinned(account.id)}
                onPinToggle={onPinToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SortIndicator({ active, desc }) {
  if (!active) {
    return (
      <span className="sort-indicator sort-indicator-inactive" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 2L8 6H2L5 2Z" fill="currentColor" />
        </svg>
      </span>
    );
  }
  return (
    <span className="sort-indicator" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M5 2L8 6H2L5 2Z"
          fill="currentColor"
          transform={desc ? "rotate(180 5 5)" : undefined}
        />
      </svg>
    </span>
  );
}
