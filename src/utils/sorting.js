import { sortAccounts } from "./filtering";

export function useSorting(accounts, sortState, setSortState) {
  const sorted = sortAccounts(accounts, sortState);

  const requestSort = (columnId) => {
    setSortState((prev) => {
      if (prev && prev.id === columnId) {
        return { id: columnId, desc: !prev.desc };
      }
      return { id: columnId, desc: false };
    });
  };

  return { sorted, requestSort };
}
