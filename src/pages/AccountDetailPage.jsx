import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon/Icon";
import Badge from "../components/ui/Badge";
import Sidebar from "../components/Sidebar/Sidebar";
import AppHeader from "../components/AppHeader/AppHeader";
import { accounts } from "../data/data";
import { sections } from "../data/sections";
import { getCategoryLabel } from "../utils/labels";
import { getStatusLabel } from "../utils/labels";
import { getPriorityLabel } from "../utils/labels";
import { prompts } from "../data/prompts";
import { youTubeTracks } from "../data/music";
import "./AccountDetailPage.css";

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const account = useMemo(() => accounts.find((a) => a.id === id), [id]);
  const accountSections = useMemo(() => {
    if (!account?.sections) return [];
    return account.sections.map((sid) => sections.find((s) => s.id === sid)).filter(Boolean);
  }, [account]);

  if (!account) {
    return (
      <div className="account-detail">
        <div className="account-detail-header">
          <Link to="/" className="account-detail-back">
            <Icon name="ArrowLeft" size={14} />
            Back to accounts
          </Link>
          <h1 className="account-detail-title">Account not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`account-detail-page ${sidebarCollapsed ? "account-detail-page-collapsed" : ""}`}>
      <Sidebar
        selectedSection={null}
        onSelectSection={() => navigate("/")}
        accountCounts={{ all: 0 }}
        promptsCount={prompts.length}
        musicTracks={youTubeTracks}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="account-detail-main">
        <AppHeader
          title={account.name}
          subtitle={account.description}
          user={{ name: "Bhanu" }}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />

        <div className="account-detail-content">
          <div className="account-detail-meta">
            <div className="account-detail-meta-item">
              <span className="account-detail-meta-label">Category</span>
              <Badge variant="default">{getCategoryLabel(account.category)}</Badge>
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
                    <span className="account-detail-section-icon">
                      <Icon name={section.icon} size={16} />
                    </span>
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
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                      title={description || url}
                    >
                      {url}
                      <Icon name="ExternalLink" size={12} aria-hidden="true" />
                    </a>
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
      </div>
    </div>
  );
}