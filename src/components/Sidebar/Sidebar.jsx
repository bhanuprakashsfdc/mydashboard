import { Link } from "react-router-dom";
import "./Sidebar.css";

const sections = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "hobby", label: "Hobby", icon: "🎨" },
  { id: "work", label: "Work", icon: "💼" },
  { id: "websites", label: "Websites", icon: "🌐" },
  { id: "skills", label: "Skills", icon: "⚡" },
];

export default function Sidebar({ selectedSection, onSelectSection, accountCounts, promptsCount }) {
  return (
    <aside className="sidebar" role="navigation" aria-label="Sections">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Sections</h2>
      </div>
      <nav className="sidebar-nav">
        <button
          type="button"
          className={`sidebar-item ${selectedSection === null ? "sidebar-item-active" : ""}`}
          onClick={() => onSelectSection(null)}
        >
          <span className="sidebar-item-icon">📋</span>
          <span className="sidebar-item-label">All accounts</span>
          <span className="sidebar-item-count">{accountCounts.all}</span>
        </button>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`sidebar-item ${selectedSection === section.id ? "sidebar-item-active" : ""}`}
            onClick={() => onSelectSection(section.id)}
          >
            <span className="sidebar-item-icon">{section.icon}</span>
            <span className="sidebar-item-label">{section.label}</span>
            <span className="sidebar-item-count">{accountCounts[section.id] || 0}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <Link to="/prompts" className="sidebar-quotes-link">
          <span className="sidebar-item-icon">📝</span>
          <span className="sidebar-item-label">Prompts</span>
          <span className="sidebar-item-count">{promptsCount || 0}</span>
        </Link>
        <Link to="/quotes" className="sidebar-quotes-link">
          <span className="sidebar-item-icon">💬</span>
          <span className="sidebar-item-label">Quotes</span>
        </Link>
        <Link to="/skills" className="sidebar-quotes-link">
          <span className="sidebar-item-icon">⚡</span>
          <span className="sidebar-item-label">Skills</span>
        </Link>
      </div>
    </aside>
  );
}
