export const calculators = [
  {
    id: "sip",
    title: "SIP Calculator",
    description: "Estimate returns on systematic investment plans.",
    icon: "PiggyBank",
    category: "investing",
    inputs: [
      { key: "monthly", label: "Monthly Investment", unit: "₹", type: "number", default: 10000 },
      { key: "rate", label: "Expected Return Rate", unit: "%", type: "number", default: 12 },
      { key: "years", label: "Time Period", unit: "years", type: "number", default: 10 },
    ],
    outputs: [
      { key: "invested", label: "Total Invested" },
      { key: "returns", label: "Est. Returns" },
      { key: "total", label: "Total Value" },
    ],
  },
  {
    id: "lumpsum",
    title: "Lump Sum Calculator",
    description: "Estimate returns on a one-time investment.",
    icon: "Wallet",
    category: "investing",
    inputs: [
      { key: "amount", label: "Investment Amount", unit: "₹", type: "number", default: 100000 },
      { key: "rate", label: "Expected Return Rate", unit: "%", type: "number", default: 12 },
      { key: "years", label: "Time Period", unit: "years", type: "number", default: 10 },
    ],
    outputs: [
      { key: "invested", label: "Invested Amount" },
      { key: "returns", label: "Est. Returns" },
      { key: "total", label: "Total Value" },
    ],
  },
  {
    id: "swp",
    title: "SWP Calculator",
    description: "Plan systematic withdrawals from your corpus.",
    icon: "ArrowDownCircle",
    category: "withdrawal",
    inputs: [
      { key: "corpus", label: "Total Corpus", unit: "₹", type: "number", default: 1000000 },
      { key: "amount", label: "Monthly Withdrawal", unit: "₹", type: "number", default: 50000 },
      { key: "rate", label: "Expected Return Rate", unit: "%", type: "number", default: 10 },
      { key: "years", label: "Withdrawal Period", unit: "years", type: "number", default: 10 },
    ],
    outputs: [
      { key: "totalWithdrawn", label: "Total Withdrawn" },
      { key: "remaining", label: "Remaining Corpus" },
    ],
  },
  {
    id: "swp-inflation",
    title: "SWP with Inflation",
    description: "Withdrawals adjusted annually for inflation.",
    icon: "TrendingUp",
    category: "withdrawal",
    inputs: [
      { key: "corpus", label: "Total Corpus", unit: "₹", type: "number", default: 1000000 },
      { key: "amount", label: "Initial Monthly Withdrawal", unit: "₹", type: "number", default: 50000 },
      { key: "rate", label: "Expected Return Rate", unit: "%", type: "number", default: 10 },
      { key: "inflation", label: "Inflation Rate", unit: "%", type: "number", default: 6 },
      { key: "years", label: "Withdrawal Period", unit: "years", type: "number", default: 15 },
    ],
    outputs: [
      { key: "totalWithdrawn", label: "Total Withdrawn" },
      { key: "remaining", label: "Remaining Corpus" },
    ],
  },
  {
    id: "swp-tax",
    title: "SWP with Tax",
    description: "After-tax systematic withdrawal planning.",
    icon: "Receipt",
    category: "withdrawal",
    inputs: [
      { key: "corpus", label: "Total Corpus", unit: "₹", type: "number", default: 1000000 },
      { key: "amount", label: "Monthly Withdrawal", unit: "₹", type: "number", default: 50000 },
      { key: "rate", label: "Expected Return Rate", unit: "%", type: "number", default: 10 },
      { key: "tax", label: "Tax Rate", unit: "%", type: "number", default: 20 },
      { key: "years", label: "Withdrawal Period", unit: "years", type: "number", default: 10 },
    ],
    outputs: [
      { key: "totalWithdrawn", label: "Total Withdrawn" },
      { key: "taxPaid", label: "Total Tax Paid" },
      { key: "remaining", label: "Remaining Corpus" },
    ],
  },
  {
    id: "runway",
    title: "Runway Calculator",
    description: "How long your savings will last with monthly expenses.",
    icon: "Timer",
    category: "planning",
    inputs: [
      { key: "savings", label: "Current Savings", unit: "₹", type: "number", default: 500000 },
      { key: "expense", label: "Monthly Expense", unit: "₹", type: "number", default: 40000 },
    ],
    outputs: [
      { key: "months", label: "Runway" },
    ],
  },
  {
    id: "goal",
    title: "Goal Planner",
    description: "Required monthly SIP to reach a financial goal.",
    icon: "Target",
    category: "planning",
    inputs: [
      { key: "target", label: "Target Amount", unit: "₹", type: "number", default: 10000000 },
      { key: "years", label: "Time Period", unit: "years", type: "number", default: 15 },
      { key: "rate", label: "Expected Return Rate", unit: "%", type: "number", default: 12 },
    ],
    outputs: [
      { key: "monthly", label: "Required Monthly SIP" },
      { key: "invested", label: "Total Invested" },
      { key: "total", label: "Total Value" },
    ],
  },
  {
    id: "net-worth",
    title: "Net Worth Calculator",
    description: "Total assets minus liabilities.",
    icon: "Scale",
    category: "planning",
    inputs: [
      { key: "assets", label: "Total Assets", unit: "₹", type: "number", default: 5000000 },
      { key: "liabilities", label: "Total Liabilities", unit: "₹", type: "number", default: 1500000 },
    ],
    outputs: [
      { key: "netWorth", label: "Net Worth" },
    ],
  },
  {
    id: "budget",
    title: "Budget Planner",
    description: "Monthly income vs expenses and savings rate.",
    icon: "BarChart3",
    category: "planning",
    inputs: [
      { key: "income", label: "Monthly Income", unit: "₹", type: "number", default: 100000 },
      { key: "expenses", label: "Monthly Expenses", unit: "₹", type: "number", default: 60000 },
    ],
    outputs: [
      { key: "surplus", label: "Monthly Surplus" },
      { key: "savingsRate", label: "Savings Rate" },
    ],
  },
  {
    id: "fd-rd",
    title: "FD / RD Calculator",
    description: "Fixed deposit or recurring deposit maturity value.",
    icon: "Building2",
    category: "investing",
    inputs: [
      { key: "principal", label: "Principal / Monthly Installment", unit: "₹", type: "number", default: 100000 },
      { key: "rate", label: "Interest Rate", unit: "%", type: "number", default: 7 },
      { key: "years", label: "Tenure", unit: "years", type: "number", default: 5 },
      { key: "compound", label: "Compounding", unit: "", type: "select", default: "monthly", options: ["monthly", "quarterly", "yearly"] },
    ],
    outputs: [
      { key: "maturity", label: "Maturity Amount" },
      { key: "interest", label: "Interest Earned" },
    ],
  },
];

export function getCalculatorById(id) {
  return calculators.find((c) => c.id === id);
}

export default calculators;
