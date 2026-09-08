import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { SwpChart } from "./Charts";

export default function SwpInflationCalculator() {
  const [corpus, setCorpus] = useState(1000000);
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(15);

  const results = useMemo(() => {
    const C = corpus || 0;
    const W = amount || 0;
    const r = (rate || 0) / 100 / 12;
    const inf = (inflation || 0) / 100 / 12;
    const n = (years || 0) * 12;
    if (!C || !W || !r || !n) return { totalWithdrawn: 0, remaining: 0 };
    let balance = C;
    let totalWithdrawn = 0;
    let currentW = W;
    for (let i = 0; i < n; i++) {
      if (i > 0 && i % 12 === 0) currentW *= (1 + inf * 12);
      balance = balance * (1 + r) - currentW;
      totalWithdrawn += currentW;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }
    return { totalWithdrawn, remaining: balance };
  }, [corpus, amount, rate, inflation, years]);

  return (
    <CalculatorLayout
      title="SWP with Inflation"
      description="Withdrawals adjusted annually for inflation."
      results={results}
      chart={<SwpChart corpus={corpus} amount={amount} rate={rate} years={years} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Total Corpus <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={corpus} onChange={(e) => setCorpus(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Initial Monthly Withdrawal <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Expected Return Rate <span className="calculator-unit">% p.a.</span></label>
        <input type="number" className="calculator-input" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Inflation Rate <span className="calculator-unit">% p.a.</span></label>
        <input type="number" className="calculator-input" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Withdrawal Period <span className="calculator-unit">years</span></label>
        <input type="number" className="calculator-input" value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
