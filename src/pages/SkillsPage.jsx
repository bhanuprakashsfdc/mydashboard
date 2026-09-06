import { useMemo } from "react";
import { skills, skillCategories } from "../data/skills";
import { getCategoryBadgeStyle } from "../utils/labels";
import Badge from "../components/ui/Badge";
import "./SkillsPage.css";

export default function SkillsPage() {
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
    <div className="skills-page">
      <div className="skills-page-header">
        <h1 className="skills-page-title">Skills</h1>
        <p className="skills-page-subtitle">
          Technical skills and expertise
        </p>
      </div>

      <div className="skills-grid">
        {Object.entries(grouped).map(([category, categorySkills]) => {
          const categoryStyle = getCategoryBadgeStyle(category);
          const categoryLabel = skillCategories.find((c) => c.id === category)?.label || category;

          return (
            <div key={category} className="skills-category">
              <div className="skills-category-header">
                <h2 className="skills-category-title">{categoryLabel}</h2>
                <span
                  className="badge"
                  style={{
                    backgroundColor: categoryStyle.backgroundColor,
                    color: categoryStyle.color,
                    borderColor: categoryStyle.borderColor,
                  }}
                >
                  {categorySkills.length}
                </span>
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
  );
}
