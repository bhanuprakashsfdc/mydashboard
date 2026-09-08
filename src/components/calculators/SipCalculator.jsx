import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { SipChart } from "./Charts";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const P = monthly || 0;
    const r = (rate || 0) / 100 / 12;
    const n = (years || 0) * 12;
    if (!P || !r || !n) return { invested: 0, returns: 0, total: 0 };
    const total = P * (((1 + r) ** n - 1) / r) * (1 + r);
    const invested = P * n;
    return { invested, returns: total - invested, total };
  }, [monthly, rate, years]);

  return (
    <CalculatorLayout
      title="SIP Calculator"
      description="Estimate returns on systematic investment plans."
      results={results}
      chart={<SipChart monthly={monthly} rate={rate} years={years} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Monthly Investment <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
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
