export const sections = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "hobby", label: "Hobby", icon: "🎨" },
  { id: "work", label: "Work", icon: "💼" },
];

export const getSectionById = (id) => sections.find((s) => s.id === id);
