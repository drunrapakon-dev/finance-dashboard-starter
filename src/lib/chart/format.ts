import type { useFormatter } from "next-intl";

type ChartFormatter = ReturnType<typeof useFormatter>;

export function formatChartCurrency(
  format: ChartFormatter,
  value: unknown,
  currency = "USD",
) {
  const numeric = Array.isArray(value)
    ? Number(value[0] ?? 0)
    : Number(value ?? 0);

  return format.number(numeric, {
    style: "currency",
    currency,
  });
}

export function formatChartCompact(format: ChartFormatter, value: number) {
  return format.number(value, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
}
