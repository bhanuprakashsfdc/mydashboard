import Icon from "../Icon/Icon";
import "./KPIStats.css";

export default function KPIStatCard({
  label,
  value,
  trend,
  trendValue,
  icon,
  variant = "default",
}) {
  const trendIcon = trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : null;
  const trendClass = trend === "up" ? "kpi-trend-up" : trend === "down" ? "kpi-trend-down" : "";

  return (
    <div className={`kpi-card kpi-card-${variant}`}>
      <div className="kpi-card-header">
        <span className="kpi-card-label">{label}</span>
        {icon && (
          <span className="kpi-card-icon" aria-hidden="true">
            <Icon name={icon} size={18} />
          </span>
        )}
      </div>
      <div className="kpi-card-value">{value}</div>
      {trend && (
        <div className={`kpi-card-trend ${trendClass}`}>
          {trendIcon && <Icon name={trendIcon} size={14} />}
          {trendValue && <span>{trendValue}</span>}
        </div>
      )}
    </div>
  );
}