import { useMemo } from "react";
import Checkbox from "../ui/Checkbox";
import "./MultiSelectFilter.css";

export default function MultiSelectFilter({
  label,
  options,
  selectedValues,
  onChange,
}) {
  return (
    <div className="filter-group">
      <p className="filter-group-label">{label}</p>
      <div className="filter-group-options">
        {options.map((option) => {
          const checked = selectedValues.includes(option);
          return (
            <Checkbox
              key={option}
              id={`filter-${label}-${option}`}
              label={option}
              checked={checked}
              onChange={() => {
                const next = checked
                  ? selectedValues.filter((v) => v !== option)
                  : [...selectedValues, option];
                onChange(next);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
