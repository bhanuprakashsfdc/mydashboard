import { useMemo } from "react";
import Checkbox from "../ui/Checkbox";
import { getCategoryById } from "../../data/categories";
import { getCategoryLabel } from "../../utils/labels";
import "./CategoryFilter.css";

export default function CategoryFilter({
  selectedValues,
  onChange,
  allAccounts,
}) {
  const options = useMemo(() => {
    const cats = new Set();
    allAccounts.forEach((a) => a.category && cats.add(a.category));
    return Array.from(cats).sort();
  }, [allAccounts]);

  return (
    <div className="filter-group">
      <p className="filter-group-label">Category</p>
      <div className="filter-group-options">
        {options.map((catId) => {
          const category = getCategoryById(catId);
          const checked = selectedValues.includes(catId);
          return (
            <Checkbox
              key={catId}
              id={`category-${catId}`}
              label={getCategoryLabel(catId)}
              checked={checked}
              onChange={() => {
                const next = checked
                  ? selectedValues.filter((v) => v !== catId)
                  : [...selectedValues, catId];
                onChange(next);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
