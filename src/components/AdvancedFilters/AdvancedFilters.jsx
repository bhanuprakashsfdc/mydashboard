import { useState } from "react";
import Icon from "../Icon/Icon";
import "./AdvancedFilters.css";

export default function AdvancedFilterChips({ activeFilters, onRemove, onClearAll, filterLabels = {} }) {
  const [expanded, setExpanded] = useState(false);

  const entries = Object.entries(activeFilters).filter(([_, v]) => v && v.length > 0);
  const visibleEntries = expanded ? entries : entries.slice(0, 4);
  const hiddenCount = entries.length - visibleEntries.length;

  if (entries.length === 0) return null;

  return (
    <div className="filter-chips">
      <div className="filter-chips-list">
        {visibleEntries.map(([key, values]) => {
          const label = filterLabels[key] || key;
          const valueList = Array.isArray(values) ? values : [values];
          return valueList.map((val, i) => (
            <span key={`${key}-${i}`} className="filter-chip">
              <span className="filter-chip-label">
                {label}: {val}
              </span>
              <button
                type="button"
                className="filter-chip-remove"
                onClick={() => onRemove(key, val)}
                aria-label={`Remove ${label} filter`}
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          ));
        })}
        {hiddenCount > 0 && (
          <button
            type="button"
            className="filter-chips-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={12} />
            {expanded ? "Show less" : `+${hiddenCount} more`}
          </button>
        )}
      </div>
      <button
        type="button"
        className="filter-chips-clear"
        onClick={onClearAll}
      >
        <Icon name="X" size={12} />
        Clear all
      </button>
    </div>
  );
}