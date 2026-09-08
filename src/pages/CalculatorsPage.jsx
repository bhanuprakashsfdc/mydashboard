import { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AppHeader from "../components/AppHeader/AppHeader";
import Icon from "../components/Icon/Icon";
import { calculators } from "../data/calculators";
import SipCalculator from "../components/calculators/SipCalculator";
import LumpSumCalculator from "../components/calculators/LumpSumCalculator";
import SwpCalculator from "../components/calculators/SwpCalculator";
import SwpInflationCalculator from "../components/calculators/SwpInflationCalculator";
import SwpTaxCalculator from "../components/calculators/SwpTaxCalculator";
import RunwayCalculator from "../components/calculators/RunwayCalculator";
import GoalPlannerCalculator from "../components/calculators/GoalPlannerCalculator";
import NetWorthCalculator from "../components/calculators/NetWorthCalculator";
import BudgetCalculator from "../components/calculators/BudgetCalculator";
import FdRdCalculator from "../components/calculators/FdRdCalculator";
import { prompts } from "../data/prompts";
import { youTubeTracks } from "../data/music";
import "./CalculatorsPage.css";

const COMPONENT_MAP = {
  "sip": SipCalculator,
  "lumpsum": LumpSumCalculator,
  "swp": SwpCalculator,
  "swp-inflation": SwpInflationCalculator,
  "swp-tax": SwpTaxCalculator,
  "runway": RunwayCalculator,
  "goal": GoalPlannerCalculator,
  "net-worth": NetWorthCalculator,
  "budget": BudgetCalculator,
  "fd-rd": FdRdCalculator,
};

export default function CalculatorsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selected, setSelected] = useState(null);

  const selectedCalc = useMemo(() => calculators.find((c) => c.id === selected), [selected]);
  const SelectedComponent = selectedCalc ? COMPONENT_MAP[selectedCalc.id] : null;

  return (
    <div className={`calculators-page ${sidebarCollapsed ? "calculators-page-collapsed" : ""}`}>
      <Sidebar
        selectedSection={null}
        onSelectSection={() => setSelected(null)}
        accountCounts={{ all: 0 }}
        promptsCount={prompts.length}
        musicTracks={youTubeTracks}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="calculators-page-main">
        <AppHeader
          title="Calculators"
          subtitle="Finance calculators for everyday planning"
          user={{ name: "Bhanu" }}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />

        {!selectedCalc ? (
          <div className="calculators-grid">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                type="button"
                className="calculator-card"
                onClick={() => setSelected(calc.id)}
              >
                <span className="calculator-card-icon">
                  <Icon name={calc.icon} size={24} />
                </span>
                <div className="calculator-card-info">
                  <h3 className="calculator-card-title">{calc.title}</h3>
                  <p className="calculator-card-desc">{calc.description}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="calculator-detail">
            <button
              type="button"
              className="calculator-back"
              onClick={() => setSelected(null)}
            >
              ← Back to calculators
            </button>
            {SelectedComponent && <SelectedComponent />}
          </div>
        )}
      </div>
    </div>
  );
}
