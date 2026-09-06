import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink";
import Badge from "../components/ui/Badge";
import { accounts } from "../data/data";
import { sections } from "../data/sections";
import { getCategoryLabel, getCategoryBadgeStyle } from "../utils/labels";
import { getStatusLabel } from "../utils/labels";
import { getPriorityLabel } from "../utils/labels";
import "./AccountDetailPage.css";

export default function AccountDetailPage() {
  const { id } = useParams();
  const account = useMemo(() => accounts.find((a) => a.id === id), [id]);
  const categoryStyle = useMemo(() => getCategoryBadgeStyle(account?.category), [account?.category]);
  const accountSections = useMemo(() => {
    if (!account?.sections) return [];
    return account.sections.map((sid) => sections.find((s) => s.id === sid)).filter(Boolean);
  }, [account]);

  if (!account) {
    return (
      <div className="account-detail">
        <div className="account-detail-header">
          <Link to="/" className="account-detail-back">← Back to accounts</Link>
          <h1 className="account-detail-title">Account not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="account-detail">
      <div className="account-detail-header">
        <Link to="/" className="account-detail-back">← Back to accounts</Link>
        <div className="account-detail-title-row">
          <h1 className="account-detail-title">{account.name}</h1>
          {account.featured && (
            <span className="account-detail-featured" title="Featured">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L9 5L13 5.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1 5.5L5 5L7 1Z"
                  fill="#f59e0b"
                />
              </svg>
            </span>
          )}
        </div>
        <p className="account-detail-description">{account.description}</p>
      </div>

      <div className="account-detail-meta">
        <div className="account-detail-meta-item">
          <span className="account-detail-meta-label">Category</span>
          <span
            className="badge"
            style={{
              backgroundColor: categoryStyle.backgroundColor,
              color: categoryStyle.color,
              borderColor: categoryStyle.borderColor,
            }}
          >
            {getCategoryLabel(account.category)}
          </span>
        </div>
        <div className="account-detail-meta-item">
          <span className="account-detail-meta-label">Status</span>
          <Badge
            variant={
              account.status === "active"
                ? "success"
                : account.status === "inactive"
                  ? "warning"
                  : "error"
            }
          >
            {getStatusLabel(account.status)}
          </Badge>
        </div>
        <div className="account-detail-meta-item">
          <span className="account-detail-meta-label">Priority</span>
          <Badge
            variant={
              account.priority === "high"
                ? "error"
                : account.priority === "medium"
                  ? "warning"
                  : "info"
            }
          >
            {getPriorityLabel(account.priority)}
          </Badge>
        </div>
      </div>

      {accountSections.length > 0 && (
        <div className="account-detail-section">
          <h2 className="account-detail-section-title">Sections</h2>
          <div className="account-detail-sections">
            {accountSections.map((section) => (
              <span key={section.id} className="account-detail-section-badge">
                <span className="account-detail-section-icon">{section.icon}</span>
                {section.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="account-detail-section">
        <h2 className="account-detail-section-title">URLs</h2>
        <ul className="account-detail-url-list">
          {(account.urls || []).map((item, index) => {
            const url = typeof item === 'string' ? item : item?.url;
            const description = typeof item === 'string' ? '' : item?.description;
            if (!url) return null;
            return (
              <li key={index} className="account-detail-url-item">
                <ExternalLink href={url} title={description || url}>{url}</ExternalLink>
                {description && <span className="account-detail-url-desc">{description}</span>}
              </li>
            );
          })}
        </ul>
      </div>

      {account.tags && account.tags.length > 0 && (
        <div className="account-detail-section">
          <h2 className="account-detail-section-title">Tags</h2>
          <div className="account-detail-tags">
            {account.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
