import { useState, useEffect } from "react";

const STORAGE_KEY = "dashboardPinnedAccountIds";

export function usePinnedAccounts() {
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...pinnedIds]));
  }, [pinnedIds]);

  const togglePin = (id) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isPinned = (id) => pinnedIds.has(id);

  const unpinAll = () => setPinnedIds(new Set());

  // Sort accounts so pinned ones appear first, preserving relative order
  // within each group.
  const pinnedFirst = (list) =>
    [...list].sort((a, b) => {
      const ap = pinnedIds.has(a.id);
      const bp = pinnedIds.has(b.id);
      if (ap && !bp) return -1;
      if (!ap && bp) return 1;
      return 0;
    });

  return { pinnedIds, togglePin, isPinned, unpinAll, pinnedFirst };
}