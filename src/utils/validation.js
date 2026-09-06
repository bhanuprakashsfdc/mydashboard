import { accounts } from "../data/data";

const REQUIRED_FIELDS = ["id", "name", "urls", "category"];
const VALID_SECTIONS = new Set(["personal", "hobby", "work", "websites", "skills"]);
const VALID_STATUSES = new Set(["active", "inactive", "archived"]);
const VALID_PRIORITIES = new Set(["low", "medium", "high"]);
const VALID_TYPES = new Set(["website", "app", "service", "tool", "platform"]);

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateAccount(account, index) {
  const errors = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (!account[field] && account[field] !== 0) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (account.id && typeof account.id !== "string") {
    errors.push("Field 'id' must be a string");
  }

  if (Array.isArray(account.urls)) {
    account.urls.forEach((u, i) => {
      const url = typeof u === 'string' ? u : u?.url;
      if (!url || !isValidUrl(url)) {
        errors.push(`Invalid URL at index ${i}: ${url || u}`);
      }
    });
  } else if (account.urls) {
    errors.push("Field 'urls' must be an array");
  }

  if (account.sections && !Array.isArray(account.sections)) {
    errors.push("Field 'sections' must be an array");
  } else if (Array.isArray(account.sections)) {
    account.sections.forEach((s, i) => {
      if (!VALID_SECTIONS.has(s)) {
        errors.push(`Invalid section at index ${i}: ${s}`);
      }
    });
  }

  if (account.status && !VALID_STATUSES.has(account.status)) {
    errors.push(`Invalid status: ${account.status}`);
  }

  if (account.priority && !VALID_PRIORITIES.has(account.priority)) {
    errors.push(`Invalid priority: ${account.priority}`);
  }

  if (account.type && !VALID_TYPES.has(account.type)) {
    errors.push(`Invalid type: ${account.type}`);
  }

  if (!Array.isArray(account.tags)) {
    errors.push("Field 'tags' must be an array");
  }

  if (!Array.isArray(account.technology)) {
    errors.push("Field 'technology' must be an array");
  }

  return errors;
}

export function validateAccounts() {
  const errors = [];
  const seenIds = new Set();

  accounts.forEach((account, index) => {
    const accountErrors = validateAccount(account, index);

    if (account.id) {
      if (seenIds.has(account.id)) {
        accountErrors.push(`Duplicate ID: ${account.id}`);
      }
      seenIds.add(account.id);
    }

    if (accountErrors.length > 0) {
      errors.push({
        account: account.name || account.id || `index ${index}`,
        problems: accountErrors,
      });
    }
  });

  return errors;
}

export function getValidationSummary() {
  const errors = validateAccounts();
  if (errors.length === 0) {
    return "All accounts are valid.";
  }
  return errors
    .map(
      (e) =>
        `Invalid account configuration:\n\nAccount: ${e.account}\n\nProblem:\n${e.problems.join("\n")}`
    )
    .join("\n\n---\n\n");
}
