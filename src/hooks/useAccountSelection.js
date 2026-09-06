import { useState, useCallback, useMemo } from "react";

export function useAccountSelection(totalFilteredCount) {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleOne = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAllFiltered = useCallback(
    (allFilteredIds) => {
      setSelectedIds((prev) => {
        const allSet = new Set(allFilteredIds);
        if (allFilteredIds.every((id) => prev.has(id))) {
          return new Set();
        }
        return allSet;
      });
    },
    []
  );

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const isSelected = useCallback((id) => selectedIds.has(id), [selectedIds]);

  const selectedCount = selectedIds.size;

  const isAllFilteredSelected = useMemo(
    () => totalFilteredCount > 0 && selectedCount === totalFilteredCount,
    [selectedCount, totalFilteredCount]
  );

  const isSomeFilteredSelected = useMemo(
    () => selectedCount > 0 && !isAllFilteredSelected,
    [selectedCount, isAllFilteredSelected]
  );

  return {
    selectedIds,
    toggleOne,
    toggleAllFiltered,
    clearSelection,
    isSelected,
    selectedCount,
    isAllFilteredSelected,
    isSomeFilteredSelected,
  };
}
