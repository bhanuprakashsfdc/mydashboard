import { getCategoryById } from "../data/categories";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, TYPE_OPTIONS } from "../types";

export function getStatusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function getPriorityLabel(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function getTypeLabel(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function getCategoryLabel(categoryId) {
  return getCategoryById(categoryId)?.label ?? categoryId;
}

export function getCategoryBadgeStyle(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return {};
  return {
    backgroundColor: category.color + "18",
    color: category.color,
    borderColor: category.color + "40",
  };
}
