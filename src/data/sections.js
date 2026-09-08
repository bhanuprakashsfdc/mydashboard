export const sections = [
  { id: "personal", label: "Personal", icon: "User" },
  { id: "hobby", label: "Hobby", icon: "Palette" },
  { id: "work", label: "Work", icon: "Briefcase" },
];

export const getSectionById = (id) => sections.find((s) => s.id === id);