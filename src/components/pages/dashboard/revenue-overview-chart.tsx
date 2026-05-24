"use client";

import { Card } from "@/components/custom/card/card";
import { ChartLegendToggle } from "@/components/custom/chart/chart-legend-toggle";
import { GranularityToggle } from "@/components/custom/chart/granularity-toggle";
import { RevenueBarChart } from "@/components/custom/chart/revenue-bar-chart";
import { StickyYAxis } from "@/components/custom/chart/sticky-y-axis";
import { MonthPicker } from "@/components/custom/month-picker/month-picker";
import { useDashboard } from "@/context/dashboard-context";
import { useHiddenKeys } from "@/hooks/use-hidden-keys";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  CHART_NARROW_MEDIA_QUERY,
  isRevenueChartScrollable,
} from "@/lib/chart/scroll-behavior";
import { buildYAxisTicks, niceAxisMax, peakRevenueValue } from "@/lib/chart/axis";
import {
  REVENUE_CHART_HEIGHT,
  REVENUE_SERIES,
  REVENUE_SERIES_COLORS,
} from "@/lib/chart/constants";
import { formatChartCompact } from "@/lib/chart/format";
import { getCompanyName } from "@/lib/mock/companies";
import { labelForRevenuePoint } from "@/lib/chart/revenue-labels";
import {
  getRevenueChartData,
  type ChartGranularity,
} from "@/lib/mock/chart-data";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export function RevenueOverviewChart() {
  const t = useTranslations("DashboardCharts");
  const format = useFormatter();
  const { dataset, monthKey, setMonthKey, companyId } = useDashboard();
  const [granularity, setGranularity] = useState<ChartGranularity>("month");
  const { hiddenKeys, toggle: toggleSeries } = useHiddenKeys(
    `${companyId}-${monthKey}-${granularity}`,
  );

  const companyName = getCompanyName(companyId);

  const chartData = useMemo(() => {
    return getRevenueChartData(dataset, monthKey, granularity).map((point) => ({
      ...point,
      label: labelForRevenuePoint(point, granularity, format),
    }));
  }, [dataset, format, granularity, monthKey]);

  const isNarrowViewport = useMediaQuery(CHART_NARROW_MEDIA_QUERY);
  const isScrollable = isRevenueChartScrollable(granularity, isNarrowViewport);
  const chartKey = `${companyId}-${monthKey}-${granularity}`;

  const yAxisMax = useMemo(() => {
    return niceAxisMax(peakRevenueValue(chartData, hiddenKeys));
  }, [chartData, hiddenKeys]);

  const yAxisTicks = useMemo(() => buildYAxisTicks(yAxisMax), [yAxisMax]);

  const legendItems = REVENUE_SERIES.map((key) => ({
    key,
    label: t(key),
    color: REVENUE_SERIES_COLORS[key],
  }));

  const seriesLabels = {
    income: t("income"),
    expenses: t("expenses"),
  } as const;

  return (
    <Card
      title={t("revenueOverviewTitle")}
      description={t("revenueOverviewDescription", { company: companyName })}
      action={<MonthPicker value={monthKey} onChange={setMonthKey} />}
    >
      <GranularityToggle value={granularity} onChange={setGranularity} />

      <div className="mt-2 flex w-full" style={{ height: REVENUE_CHART_HEIGHT }}>
        <StickyYAxis
          ticks={yAxisTicks}
          max={yAxisMax}
          formatTick={(value) => formatChartCompact(format, value)}
        />

        <RevenueBarChart
          chartKey={chartKey}
          chartData={chartData}
          granularity={granularity}
          hiddenKeys={hiddenKeys}
          yAxisMax={yAxisMax}
          isScrollable={isScrollable}
          format={format}
          labels={seriesLabels}
        />
      </div>

      <ChartLegendToggle
        items={legendItems}
        hiddenKeys={hiddenKeys}
        onToggle={toggleSeries}
      />
    </Card>
  );
}
