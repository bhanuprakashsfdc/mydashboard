import Icon from "./Icon/Icon";
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
        <Icon name="Inbox" size={48} />
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