import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./Sidebar.css";

const sections = [
  { id: "personal", label: "Personal", icon: "User" },
  { id: "hobby", label: "Hobby", icon: "Palette" },
  { id: "work", label: "Work", icon: "Briefcase" },
  { id: "websites", label: "Websites", icon: "Globe" },
  { id: "skills", label: "Skills", icon: "Zap" },
];

export default function Sidebar({
  selectedSection,
  onSelectSection,
  accountCounts,
  promptsCount,
  onCollapse,
  collapsed = false,
  musicTracks = [],
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`} role="navigation" aria-label="Sections">
      <div className="sidebar-header">
        <h2 className="sidebar-title">{collapsed ? "MD" : "Sections"}</h2>
        {onCollapse && (
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        )}
      </div>
      <nav className="sidebar-nav">
        <Link to="/calculators" className="sidebar-item sidebar-item-calculator">
          <span className="sidebar-item-icon">
            <Icon name="Calculator" size={18} />
          </span>
          <span className="sidebar-item-label">Calculators</span>
        </Link>
        <button
          type="button"
          className={`sidebar-item ${selectedSection === null ? "sidebar-item-active" : ""}`}
          onClick={() => onSelectSection(null)}
          onMouseEnter={() => setHoveredItem("all")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span className="sidebar-item-icon">
            <Icon name="LayoutDashboard" size={18} />
          </span>
          <span className="sidebar-item-label">All accounts</span>
          <span className="sidebar-item-count">{accountCounts.all}</span>
        </button>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`sidebar-item ${selectedSection === section.id ? "sidebar-item-active" : ""}`}
            onClick={() => onSelectSection(section.id)}
            onMouseEnter={() => setHoveredItem(section.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className="sidebar-item-icon">
              <Icon name={section.icon} size={18} />
            </span>
            <span className="sidebar-item-label">{section.label}</span>
            <span className="sidebar-item-count">{accountCounts[section.id] || 0}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <Link to="/prompts" className="sidebar-quotes-link">
          <span className="sidebar-item-icon">
            <Icon name="FileText" size={18} />
          </span>
          <span className="sidebar-item-label">Prompts</span>
          <span className="sidebar-item-count">{promptsCount || 0}</span>
        </Link>
        <Link to="/quotes" className="sidebar-quotes-link">
          <span className="sidebar-item-icon">
            <Icon name="MessageSquare" size={18} />
          </span>
          <span className="sidebar-item-label">Quotes</span>
        </Link>
        <Link to="/skills" className="sidebar-quotes-link">
          <span className="sidebar-item-icon">
            <Icon name="Code" size={18} />
          </span>
          <span className="sidebar-item-label">Skills</span>
        </Link>
        {musicTracks.length > 0 && (
          <div className="sidebar-music">
            <p className="sidebar-music-label">Music</p>
            {musicTracks.map((track) => (
              <a
                key={track.id}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-music-link"
              >
                <span className="sidebar-item-icon">
                  <Icon name="Play" size={16} />
                </span>
                <span className="sidebar-item-label">{track.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}