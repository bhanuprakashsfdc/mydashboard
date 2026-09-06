import { useMemo } from "react";
import { accounts } from "../data/data.js";

const sections = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "hobby", label: "Hobby", icon: "🎨" },
  { id: "work", label: "Work", icon: "💼" },
  { id: "websites", label: "Websites", icon: "🌐" },
  { id: "skills", label: "Skills", icon: "⚡" },
];

export function useSectionFilter(selectedSectionId) {
  const counts = useMemo(() => {
    const counts = { all: accounts.length };
    sections.forEach((s) => {
      counts[s.id] = 0;
    });
    accounts.forEach((account) => {
      (account.sections || []).forEach((sectionId) => {
        counts[sectionId] = (counts[sectionId] || 0) + 1;
      });
    });
    return counts;
  }, []);

  const filteredAccounts = useMemo(() => {
    if (!selectedSectionId) return accounts;
    return accounts.filter((account) => account.sections?.includes(selectedSectionId));
  }, [selectedSectionId]);

  return { filteredAccounts, counts };
}
