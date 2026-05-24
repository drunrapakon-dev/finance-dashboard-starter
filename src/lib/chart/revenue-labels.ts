import type { ChartGranularity } from "@/lib/mock/chart-data";
import type { useFormatter } from "next-intl";

type ChartFormatter = ReturnType<typeof useFormatter>;

export function labelForRevenuePoint(
  point: { key: string; label: string },
  granularity: ChartGranularity,
  format: ChartFormatter,
) {
  if (granularity === "year" || granularity === "month") {
    return format.dateTime(new Date(`${point.key}-01`), { month: "short" });
  }

  return point.label;
}
