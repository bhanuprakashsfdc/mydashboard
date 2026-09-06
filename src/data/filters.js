export const filterDefinitions = [
  {
    key: "search",
    label: "Search",
    type: "search",
    fields: ["name", "description", "tags", "technology", "notes"],
  },
  {
    key: "category",
    label: "Category",
    type: "multiSelect",
    optionsKey: "categories",
  },
  {
    key: "subCategory",
    label: "Sub-category",
    type: "multiSelect",
    optionsKey: "subCategories",
  },
  {
    key: "status",
    label: "Status",
    type: "multiSelect",
    options: ["active", "inactive", "archived"],
  },
  {
    key: "priority",
    label: "Priority",
    type: "multiSelect",
    options: ["low", "medium", "high"],
  },
  {
    key: "type",
    label: "Type",
    type: "multiSelect",
    options: ["website", "app", "service", "tool", "platform"],
  },
  {
    key: "tags",
    label: "Tags",
    type: "multiSelect",
    optionsKey: "tags",
  },
  {
    key: "featured",
    label: "Featured",
    type: "boolean",
  },
];
