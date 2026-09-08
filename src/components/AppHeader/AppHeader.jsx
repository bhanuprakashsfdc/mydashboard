import { useState } from "react";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
import LiveTime from "../LiveTime/LiveTime";
import "./AppHeader.css";

export default function AppHeader({
  title = "Dashboard",
  subtitle = "",
  user = { name: "User" },
  notifications = 0,
  onNotificationClick,
  onUserClick,
  onMenuClick,
  collapsed = false,
  actions,
}) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  });

  const applyTheme = (next) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="app-header" role="banner">
      {onMenuClick && (
        <button
          type="button"
          className="app-header-menu"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
        </button>
      )}
      <div className="app-header-title">
        <div className="app-header-accent" aria-hidden="true" />
        <h1 className="app-header-heading">{title}</h1>
        {subtitle && <p className="app-header-subtitle">{subtitle}</p>}
      </div>
      <div className="app-header-actions">
        <LiveTime />
        {actions}
        <button
          type="button"
          className="app-header-theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          <Icon name={theme === "light" ? "Moon" : "Sun"} size={18} />
        </button>
        {onNotificationClick && (
          <button
            type="button"
            className="app-header-notification"
            onClick={onNotificationClick}
            aria-label={notifications > 0 ? `${notifications} notifications` : "Notifications"}
          >
            <Icon name="Bell" size={20} />
            {notifications > 0 && (
              <span className="app-header-notification-badge" aria-hidden="true">
                {notifications > 99 ? "99+" : notifications}
              </span>
            )}
          </button>
        )}
        {onUserClick ? (
          <button
            type="button"
            className="app-header-user-btn"
            onClick={onUserClick}
            aria-label={`User menu for ${user.name}`}
          >
            <Avatar name={user.name} src={user.src} size="md" status={user.status} />
          </button>
        ) : (
          <Avatar name={user.name} src={user.src} size="md" status={user.status} />
        )}
      </div>
    </header>
  );
}