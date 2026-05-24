import type { RevenueSeriesKey } from "@/lib/chart/constants";

export function niceAxisMax(value: number) {
  if (value <= 0) {
    return 4;
  }

  const exponent = Math.floor(Math.log10(value));
  const magnitude = 10 ** exponent;
  const normalized = value / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
}

export function buildYAxisTicks(max: number) {
  const step = max / 4;
  return [0, step, step * 2, step * 3, max];
}

type RevenueValues = {
  income: number;
  expenses: number;
};

export function peakRevenueValue(
  points: RevenueValues[],
  hiddenKeys: Set<string>,
  series: readonly RevenueSeriesKey[] = ["income", "expenses"],
) {
  let peak = 0;

  for (const point of points) {
    for (const key of series) {
      if (!hiddenKeys.has(key)) {
        peak = Math.max(peak, point[key]);
      }
    }
  }

  return peak;
}
