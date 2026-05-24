import { CHART_NARROW_MAX_WIDTH } from "@/lib/chart/constants";
import type { ChartGranularity } from "@/lib/mock/chart-data";

export const CHART_NARROW_MEDIA_QUERY = `(max-width: ${CHART_NARROW_MAX_WIDTH}px)`;

export function isRevenueChartScrollable(
  granularity: ChartGranularity,
  isNarrowViewport: boolean,
) {
  if (granularity === "day") {
    return true;
  }

  if (
    isNarrowViewport &&
    (granularity === "year" || granularity === "month")
  ) {
    return true;
  }

  return false;
}
