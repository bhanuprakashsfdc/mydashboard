import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { LumpsumChart } from "./Charts";

export default function LumpSumCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const P = amount || 0;
    const r = (rate || 0) / 100;
    const t = years || 0;
    if (!P || !r || !t) return { invested: 0, returns: 0, total: 0 };
    const total = P * (1 + r) ** t;
    return { invested: P, returns: total - P, total };
  }, [amount, rate, years]);

  return (
    <CalculatorLayout
      title="Lump Sum Calculator"
      description="Estimate returns on a one-time investment."
      results={results}
      chart={<LumpsumChart amount={amount} rate={rate} years={years} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Investment Amount <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Expected Return Rate <span className="calculator-unit">% p.a.</span></label>
        <input type="number" className="calculator-input" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Time Period <span className="calculator-unit">years</span></label>
        <input type="number" className="calculator-input" value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
