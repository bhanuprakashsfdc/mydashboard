import { useState, useMemo } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { SwpChart } from "./Charts";

export default function SwpTaxCalculator() {
  const [corpus, setCorpus] = useState(1000000);
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(10);
  const [tax, setTax] = useState(20);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const C = corpus || 0;
    const W = amount || 0;
    const r = (rate || 0) / 100 / 12;
    const taxRate = (tax || 0) / 100;
    const n = (years || 0) * 12;
    if (!C || !W || !r || !n) return { totalWithdrawn: 0, taxPaid: 0, remaining: 0 };
    let balance = C;
    let totalWithdrawn = 0;
    let totalTaxPaid = 0;
    for (let i = 0; i < n; i++) {
      const taxable = Math.max(0, W - 40000);
      const tax = taxable * taxRate;
      const net = W - tax;
      balance = balance * (1 + r) - net;
      totalWithdrawn += W;
      totalTaxPaid += tax;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }
    return { totalWithdrawn, taxPaid: totalTaxPaid, remaining: balance };
  }, [corpus, amount, rate, tax, years]);

  return (
    <CalculatorLayout
      title="SWP with Tax"
      description="After-tax systematic withdrawal planning."
      results={results}
      chart={<SwpChart corpus={corpus} amount={amount} rate={rate} years={years} />}
    >
      <div className="calculator-field">
        <label className="calculator-label">Total Corpus <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={corpus} onChange={(e) => setCorpus(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Monthly Withdrawal <span className="calculator-unit">₹</span></label>
        <input type="number" className="calculator-input" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Expected Return Rate <span className="calculator-unit">% p.a.</span></label>
        <input type="number" className="calculator-input" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Tax Rate <span className="calculator-unit">%</span></label>
        <input type="number" className="calculator-input" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
      </div>
      <div className="calculator-field">
        <label className="calculator-label">Withdrawal Period <span className="calculator-unit">years</span></label>
        <input type="number" className="calculator-input" value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
    </CalculatorLayout>
  );
}
