import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Checkbox from "../ui/Checkbox";
import Badge from "../ui/Badge";
import ExternalLink from "../ExternalLink";
import { getCategoryLabel, getCategoryBadgeStyle } from "../../utils/labels";
import { getStatusLabel } from "../../utils/labels";
import { getPriorityLabel } from "../../utils/labels";
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

export default function AccountCard({ account, isSelected, onToggle, index = 0 }) {
  const categoryStyle = useMemo(() => getCategoryBadgeStyle(account.category), [account.category]);
  const primaryUrl = account.urls?.[0]?.url;
  const additionalCount = (account.urls?.length || 0) - 1;

  return (
    <motion.div
      className={`account-card ${isSelected ? "account-card-selected" : ""}`}
      role="row"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="account-card-header" role="gridcell">
        <div className="account-card-title-area">
          <Link to={`/accounts/${account.id}`} className="account-card-name-link">
            <span className="account-card-name">{account.name}</span>
          </Link>
          {account.featured && (
            <span className="account-card-featured" title="Featured">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L9 5L13 5.5L10 8.5L11 13L7 10.5L3 13L4 8.5L1 5.5L5 5L7 1Z"
                  fill="#f59e0b"
                />
              </svg>
            </span>
          )}
        </div>
        <div className="account-card-description">{account.description}</div>
      </div>

      <div className="account-card-body" role="gridcell">
        <div className="account-card-meta">
          <span className="account-card-meta-label">Category</span>
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

        <div className="account-card-meta">
          <span className="account-card-meta-label">Status</span>
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

        <div className="account-card-meta">
          <span className="account-card-meta-label">Priority</span>
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

      <div className="account-card-footer" role="gridcell">
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
              {isSelected && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6L5 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </label>
          {primaryUrl && (
            <span className="account-card-urls">
              <ExternalLink href={primaryUrl}>Open</ExternalLink>
              {additionalCount > 0 && (
                <Link to={`/accounts/${account.id}`} className="account-card-more">
                  +{additionalCount} more
                </Link>
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
