import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { BudgetChart } from "./Charts";

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState(5000000);
  const [liabilities, setLiabilities] = useState(1500000);

  const results = useMemo(() => {
    const a = assets || 0;
    const l = liabilities || 0;
    return { netWorth: a - l };
  }, [assets, liabilities]);

  return (
    <CalculatorLayout
      title="Net Worth Calculator"
      description="Total assets minus liabilities."
      results={results}
      chart={<BudgetChart income={assets} expenses={liabilities} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Total Assets <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={assets} onChange={(e) => setAssets(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Total Liabilities <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
