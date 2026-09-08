import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { RunwayChart } from "./Charts";

export default function RunwayCalculator() {
  const [savings, setSavings] = useState(500000);
  const [expense, setExpense] = useState(40000);

  const results = useMemo(() => {
    const s = savings || 0;
    const e = expense || 0;
    if (!s || !e) return { months: 0, days: 0 };
    const months = Math.floor(s / e);
    const remaining = s - months * e;
    const days = Math.round((remaining / e) * 30);
    return { months, days };
  }, [savings, expense]);

  return (
    <CalculatorLayout
      title="Runway Calculator"
      description="How long your savings will last with monthly expenses."
      results={results}
      chart={<RunwayChart savings={savings} expense={expense} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Current Savings <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={savings} onChange={(e) => setSavings(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Monthly Expense <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={expense} onChange={(e) => setExpense(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
