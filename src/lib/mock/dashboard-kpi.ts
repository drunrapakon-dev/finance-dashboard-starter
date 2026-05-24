export type KpiMetricKey = "totalBalance" | "income" | "expenses" | "cashflow";

export type MonthlyKpiSnapshot = {
  monthKey: string;
  totalBalance: number;
  income: number;
  expenses: number;
  cashflow: number;
};

export const mockKpiSnapshots: MonthlyKpiSnapshot[] = [
  {
    monthKey: "2026-01",
    totalBalance: 125_400,
    income: 42_800,
    expenses: 31_200,
    cashflow: 11_600,
  },
  {
    monthKey: "2026-02",
    totalBalance: 138_950,
    income: 51_500,
    expenses: 38_400,
    cashflow: 13_100,
  },
  {
    monthKey: "2026-03",
    totalBalance: 152_750,
    income: 47_200,
    expenses: 34_850,
    cashflow: 12_350,
  },
];

export function getLatestKpiSnapshot() {
  return mockKpiSnapshots[mockKpiSnapshots.length - 1];
}

export function getPreviousKpiSnapshot() {
  return mockKpiSnapshots[mockKpiSnapshots.length - 2];
}

export function getKpiChangePercent(
  metric: KpiMetricKey,
  current = getLatestKpiSnapshot(),
  previous = getPreviousKpiSnapshot(),
) {
  const currentValue = current[metric];
  const previousValue = previous[metric];

  if (previousValue === 0) {
    return 0;
  }

  return ((currentValue - previousValue) / previousValue) * 100;
}
