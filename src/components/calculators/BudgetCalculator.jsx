import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { BudgetChart } from "./Charts";

export default function BudgetCalculator() {
  const [income, setIncome] = useState(100000);
  const [expenses, setExpenses] = useState(60000);

  const results = useMemo(() => {
    const inc = income || 0;
    const exp = expenses || 0;
    const surplus = inc - exp;
    const rate = inc > 0 ? ((surplus / inc) * 100) : 0;
    return { surplus, savingsRate: `${rate.toFixed(1)}%` };
  }, [income, expenses]);

  return (
    <CalculatorLayout
      title="Budget Planner"
      description="Monthly income vs expenses and savings rate."
      results={results}
      chart={<BudgetChart income={income} expenses={expenses} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Monthly Income <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Monthly Expenses <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
