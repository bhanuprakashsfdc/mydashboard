export function formatCurrency(n, unit = "₹") {
  if (typeof n === "string") return n;
  if (!Number.isFinite(n)) return `${unit} 0`;
  const abs = Math.abs(n);
  const formatted = abs >= 1e7
    ? `${unit} ${(abs / 1e7).toFixed(2)} Cr`
    : abs >= 1e5
      ? `${unit} ${(abs / 1e5).toFixed(2)} L`
      : abs >= 1e3
        ? `${unit} ${(abs / 1e3).toFixed(1)} K`
        : `${unit} ${abs.toFixed(0)}`;
  const prefix = n < 0 ? "-" : "";
  return `${prefix}${formatted}`;
}
