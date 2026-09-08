import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { formatCurrency } from "./formatCurrency";

const COLORS = ["#C88D68", "#6F9B7A", "#8FB6C4", "#E0C06A", "#E8937A", "#B5B2AC"];

export function SipChart({ monthly, rate, years }) {
  const data = useMemo(() => {
    const r = (rate || 0) / 100 / 12;
    const n = (years || 0) * 12;
    const points = [];
    let invested = 0;
    let value = 0;
    for (let i = 1; i <= n; i++) {
      invested += monthly || 0;
      value = ((monthly || 0) * ((Math.pow(1 + r, i) - 1) / r) * (1 + r));
      if (i % Math.max(1, Math.floor(n / 12)) === 0 || i === n) {
        points.push({ year: (i / 12).toFixed(1), invested, returns: value - invested, value });
      }
    }
    return points;
  }, [monthly, rate, years]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12 }} width={70} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
        <Area type="monotone" dataKey="invested" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} name="Invested" />
        <Area type="monotone" dataKey="returns" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} name="Returns" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LumpsumChart({ amount, rate, years }) {
  const data = useMemo(() => {
    const r = (rate || 0) / 100;
    const points = [];
    for (let i = 0; i <= years; i++) {
      const value = (amount || 0) * Math.pow(1 + r, i);
      points.push({ year: i, value, returns: value - (amount || 0) });
    }
    return points;
  }, [amount, rate, years]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12 }} width={70} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
        <Area type="monotone" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.5} name="Total Value" />
        <Area type="monotone" dataKey="returns" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.5} name="Returns" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SwpChart({ corpus, amount, rate, years }) {
  const data = useMemo(() => {
    const monthlyRate = (rate || 0) / 100 / 12;
    const n = (years || 0) * 12;
    const points = [];
    let balance = corpus || 0;
    for (let i = 1; i <= n; i++) {
      balance = balance * (1 + monthlyRate) - (amount || 0);
      if (balance < 0) balance = 0;
      if (i % Math.max(1, Math.floor(n / 12)) === 0 || i === n) {
        points.push({ year: (i / 12).toFixed(1), balance, withdrawn: (amount || 0) * i });
      }
    }
    return points;
  }, [corpus, amount, rate, years]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12 }} width={70} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
        <Line type="monotone" dataKey="balance" stroke={COLORS[0]} name="Remaining Corpus" strokeWidth={2} />
        <Line type="monotone" dataKey="withdrawn" stroke={COLORS[2]} name="Total Withdrawn" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FdChart({ principal, rate, years }) {
  const data = useMemo(() => {
    const r = (rate || 0) / 100;
    const points = [];
    for (let i = 0; i <= years; i++) {
      const value = (principal || 0) * Math.pow(1 + r, i);
      points.push({ year: i, value, interest: value - (principal || 0) });
    }
    return points;
  }, [principal, rate, years]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12 }} width={70} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
        <Area type="monotone" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.5} name="Maturity" />
        <Area type="monotone" dataKey="interest" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.5} name="Interest" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BudgetChart({ income, expenses }) {
  const data = useMemo(() => [
    { name: "Income", value: income || 0, fill: COLORS[1] },
    { name: "Expenses", value: expenses || 0, fill: COLORS[3] },
    { name: "Savings", value: Math.max(0, (income || 0) - (expenses || 0)), fill: COLORS[0] },
  ], [income, expenses]);

  if (!data.some((d) => d.value > 0)) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function GoalChart({ target, years, rate }) {
  const data = useMemo(() => {
    const r = (rate || 0) / 100 / 12;
    const n = (years || 0) * 12;
    const points = [];
    for (let i = 0; i <= n; i += Math.max(1, Math.floor(n / 12))) {
      const value = (target || 0) * ((Math.pow(1 + r, i) - 1) / r) * (1 + r);
      points.push({ year: (i / 12).toFixed(1), value });
    }
    if (points[points.length - 1]?.year !== (n / 12).toFixed(1)) {
      points.push({ year: (n / 12).toFixed(1), value: target || 0 });
    }
    return points;
  }, [target, years, rate]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12 }} width={70} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={COLORS[0]} name="Goal Value" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RunwayChart({ savings, expense }) {
  const data = useMemo(() => {
    const s = savings || 0;
    const e = expense || 0;
    if (!s || !e) return [];
    const months = Math.ceil(s / e);
    const points = [];
    for (let i = 0; i <= months; i++) {
      const balance = Math.max(0, s - e * i);
      points.push({ month: i, balance });
    }
    return points;
  }, [savings, expense]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} label={{ value: "Months", position: "insideBottom", offset: -5 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 12 }} width={70} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend />
        <Area type="monotone" dataKey="balance" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.4} name="Remaining Savings" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
