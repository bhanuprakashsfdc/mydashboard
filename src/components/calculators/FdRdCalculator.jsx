import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { FdChart } from "./Charts";

export default function FdRdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [compound, setCompound] = useState("monthly");

  const results = useMemo(() => {
    const P = principal || 0;
    const r = (rate || 0) / 100;
    const t = years || 0;
    if (!P || !r || !t) return { maturity: 0, interest: 0 };
    const n = compound === "monthly" ? 12 : compound === "quarterly" ? 4 : 1;
    const total = P * (1 + r / n) ** (n * t);
    return { maturity: total, interest: total - P };
  }, [principal, rate, years, compound]);

  return (
    <CalculatorLayout
      title="FD / RD Calculator"
      description="Fixed deposit or recurring deposit maturity value."
      results={results}
      chart={<FdChart principal={principal} rate={rate} years={years} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Principal / Monthly Installment <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Interest Rate <span className="calculator-unit">% p.a.</span></label>
        <input type="number" className="calculator-input" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Tenure <span className="calculator-unit">years</span></label>
        <input type="number" className="calculator-input" value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Compounding</label>
        <select className="calculator-input" value={compound} onChange={(e) => setCompound(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
    </CalculatorLayout>
  );
}
