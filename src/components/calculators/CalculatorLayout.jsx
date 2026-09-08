import { useMemo } from "react";
import { formatCurrency } from "./formatCurrency";
import "./CalculatorLayout.css";

export default function CalculatorLayout({ title, description, children, results, chart }) {
  const resultItems = useMemo(() => {
    if (!results) return [];
    return Object.entries(results).map(([key, value]) => ({
      key,
      label: key,
      value,
    }));
  }, [results]);

  return (
    <div className="calculator-layout">
      <div className="calculator-layout-header">
        <h2 className="calculator-layout-title">{title}</h2>
        {description && <p className="calculator-layout-desc">{description}</p>}
      </div>
      <div className="calculator-layout-body">
        <div className="calculator-layout-inputs">
          {children}
        </div>
        <div className="calculator-layout-results">
          {resultItems.length > 0 && (
            <div className="calculator-results-grid">
              {resultItems.map((r) => (
                <div key={r.key} className="calculator-result-card">
                  <span className="calculator-result-label">{r.label}</span>
                  <span className="calculator-result-value">{formatCurrency(r.value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {chart && <div className="calculator-chart">{chart}</div>}
      </div>
    </div>
  );
}
