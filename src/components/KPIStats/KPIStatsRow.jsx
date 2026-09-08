import KPIStatCard from "./KPIStatCard";
import "./KPIStats.css";

export default function KPIStatsRow({ stats }) {
  return (
    <div className="kpi-stats-row">
      {stats.map((stat, index) => (
        <KPIStatCard key={stat.label || index} {...stat} />
      ))}
    </div>
  );
}