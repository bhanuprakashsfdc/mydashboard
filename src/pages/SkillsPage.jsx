import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { skills, skillCategories } from "../data/skills";
import Icon from "../components/Icon/Icon";
import Badge from "../components/ui/Badge";
import Sidebar from "../components/Sidebar/Sidebar";
import AppHeader from "../components/AppHeader/AppHeader";
import { prompts } from "../data/prompts";
import { youTubeTracks } from "../data/music";
import "./SkillsPage.css";

export default function SkillsPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const grouped = useMemo(() => {
    const groups = {};
    skills.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });
    return groups;
  }, []);

  const getLevelVariant = (level) => {
    switch (level) {
      case "expert":
        return "success";
      case "advanced":
        return "info";
      case "intermediate":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className={`skills-page ${sidebarCollapsed ? "skills-page-collapsed" : ""}`}>
      <Sidebar
        selectedSection={null}
        onSelectSection={() => navigate("/")}
        accountCounts={{ all: 0 }}
        promptsCount={prompts.length}
        musicTracks={youTubeTracks}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="skills-page-main">
        <AppHeader
          title="Skills"
          subtitle="Technical skills and expertise"
          user={{ name: "Bhanu" }}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />

        <div className="skills-page-content">
          <div className="skills-grid">
            {Object.entries(grouped).map(([category, categorySkills]) => {
              const categoryLabel = skillCategories.find((c) => c.id === category)?.label || category;

              return (
                <div key={category} className="skills-category">
                  <div className="skills-category-header">
                    <h2 className="skills-category-title">{categoryLabel}</h2>
                    <Badge variant="default">{categorySkills.length}</Badge>
                  </div>
                  <div className="skills-list">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="skill-card">
                        <div className="skill-card-header">
                          <h3 className="skill-name">{skill.name}</h3>
                          <Badge variant={getLevelVariant(skill.level)}>
                            {skill.level}
                          </Badge>
                        </div>
                        <p className="skill-description">{skill.description}</p>
                        <div className="skill-meta">
                          <span className="skill-years">{skill.years} years</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}