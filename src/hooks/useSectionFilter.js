import { useMemo } from "react";
import { accounts } from "../data/data.js";

const sections = [
  { id: "personal", label: "Personal", icon: "User" },
  { id: "hobby", label: "Hobby", icon: "Palette" },
  { id: "work", label: "Work", icon: "Briefcase" },
  { id: "websites", label: "Websites", icon: "Globe" },
  { id: "skills", label: "Skills", icon: "Zap" },
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