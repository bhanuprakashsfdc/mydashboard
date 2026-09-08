export const categories = [
  { id: "coding", label: "Coding", color: "#3b82f6" },
  { id: "work", label: "Work", color: "#10b981" },
  { id: "ai", label: "AI", color: "#8b5cf6" },
  { id: "development", label: "Development", color: "#f59e0b" },
  { id: "design", label: "Design", color: "#ec4899" },
  { id: "productivity", label: "Productivity", color: "#06b6d4" },
  { id: "finance", label: "Finance", color: "#84cc16" },
  { id: "learning", label: "Learning", color: "#f97316" },
  { id: "other", label: "Other", color: "#6b7280" },
];

export const getCategoryById = (id) => categories.find((c) => c.id === id);
export const getCategoryColor = (id) => getCategoryById(id)?.color ?? "#6b7280";
