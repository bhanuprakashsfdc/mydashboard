import "./EmptyState.css";

export default function EmptyState({
  title = "No accounts found",
  description = "Try adjusting your search or filters.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect
            x="8"
            y="14"
            width="32"
            height="24"
            rx="3"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <path
            d="M8 22H40"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <circle cx="14" cy="18" r="1.5" fill="#94a3b8" />
          <circle cx="20" cy="18" r="1.5" fill="#94a3b8" />
          <circle cx="26" cy="18" r="1.5" fill="#94a3b8" />
        </svg>
      </div>
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-secondary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
