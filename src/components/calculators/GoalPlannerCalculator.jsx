import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { GoalChart } from "./Charts";

export default function GoalPlannerCalculator() {
  const [target, setTarget] = useState(10000000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const results = useMemo(() => {
    const FV = target || 0;
    const t = years || 0;
    const r = (rate || 0) / 100 / 12;
    const n = t * 12;
    if (!FV || !r || !n) return { monthly: 0, invested: 0, total: FV };
    const monthly = FV * r / ((1 + r) ** n - 1) / (1 + r);
    const invested = monthly * n;
    return { monthly, invested, total: FV };
  }, [target, years, rate]);

  return (
    <CalculatorLayout
      title="Goal Planner"
      description="Required monthly SIP to reach a financial goal."
      results={results}
      chart={<GoalChart target={target} years={years} rate={rate} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Target Amount <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Time Period <span className="calculator-unit">years</span></label>
        <input type="number" className="calculator-input" value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Expected Return Rate <span className="calculator-unit">% p.a.</span></label>
        <input type="number" className="calculator-input" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
