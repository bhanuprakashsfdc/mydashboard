import Icon from "../Icon/Icon";
import "./AccountCard.css";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function AccountCard({ account, isSelected, onToggle, index = 0, pinned = false, onPinToggle }) {
  const primaryUrl = account.urls?.[0]?.url;
  const additionalCount = (account.urls?.length || 0) - 1;

  return (
    <div
      className={`account-card ${isSelected ? "account-card-selected" : ""} ${pinned ? "account-card-pinned" : ""}`}
      role="row"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {onPinToggle && (
        <button
          type="button"
          className="account-card-pin"
          onClick={() => onPinToggle(account.id)}
          aria-label={pinned ? "Unpin account" : "Pin account"}
          title={pinned ? "Unpin account" : "Pin account to top"}
        >
          <Icon name={pinned ? "PinOff" : "Pin"} size={14} />
        </button>
      )}
      <div className="account-card-header">
        <div className="account-card-title-area">
          <a href={primaryUrl} className="account-card-name-link" target="_blank" rel="noopener noreferrer">
            <span className="account-card-name">{account.name}</span>
          </a>
          {account.featured && (
            <span className="account-card-featured" title="Featured">
              <Icon name="Star" size={14} />
            </span>
          )}
        </div>
        <div className="account-card-description">{account.description}</div>
      </div>

      <div className="account-card-body">
        <div className="account-card-meta">
          <span className="account-card-meta-label">Category</span>
          <span className="badge badge-default">{account.category}</span>
        </div>

        <div className="account-card-meta">
          <span className="account-card-meta-label">Status</span>
          <span className={`badge badge-${account.status === "active" ? "success" : account.status === "inactive" ? "warning" : "error"}`}>
            {account.status}
          </span>
        </div>

        <div className="account-card-meta">
          <span className="account-card-meta-label">Priority</span>
          <span className={`badge badge-${account.priority === "high" ? "error" : account.priority === "medium" ? "warning" : "info"}`}>
            {account.priority}
          </span>
        </div>
      </div>

      <div className="account-card-footer">
        <div className="account-card-tags">
          {(account.tags || []).slice(0, 4).map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
          {(account.tags || []).length > 4 && (
            <span className="tag-chip tag-chip-muted">+{account.tags.length - 4}</span>
          )}
        </div>
        <div className="account-card-actions">
          <label className="card-select-label" title="Select">
            <input
              type="checkbox"
              className="card-select-input"
              checked={isSelected}
              onChange={() => onToggle(account.id)}
            />
            <span className="card-select-visual" aria-hidden="true">
              {isSelected && <Icon name="Check" size={12} />}
            </span>
          </label>
          {primaryUrl && (
            <div className="account-card-urls">
              <a
                href={primaryUrl}
                className="account-card-open"
                target="_blank"
                rel="noopener noreferrer"
                title={primaryUrl}
              >
                <Icon name="ExternalLink" size={14} />
                Open
              </a>
              {additionalCount > 0 && (
                <a href={`/accounts/${account.id}`} className="account-card-more">
                  +{additionalCount} more
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}