"use client";

import { Card } from "@/components/custom/card/card";
import { GranularityToggle } from "@/components/custom/chart/granularity-toggle";
import { ScrollableChartShell } from "@/components/custom/chart/scrollable-chart-shell";
import { MonthPicker } from "@/components/custom/month-picker/month-picker";
import { useDashboard, useDashboardDataset } from "@/context/dashboard-context";
import { useSettings } from "@/context/settings-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { buildYAxisTicks, niceAxisMax, peakRevenueValue } from "@/lib/chart/axis";
import {
  CHART_TOOLTIP_STYLE,
  REVENUE_CHART_HEIGHT,
  REVENUE_CHART_MARGIN,
  REVENUE_SERIES_COLORS,
  REVENUE_X_AXIS_HEIGHT,
} from "@/lib/chart/constants";
import { formatChartCompact, formatChartCurrency } from "@/lib/chart/format";
import { labelForRevenuePoint } from "@/lib/chart/revenue-labels";
import {
  CHART_NARROW_MEDIA_QUERY,
  isRevenueChartScrollable,
} from "@/lib/chart/scroll-behavior";
import { getCompanyName } from "@/lib/mock/companies";
import {
  getRevenueChartData,
  type ChartGranularity,
} from "@/lib/mock/chart-data";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const lineProps = {
  type: "monotone" as const,
  strokeWidth: 2.5,
  dot: { r: 4, strokeWidth: 0 },
  activeDot: { r: 6 },
  isAnimationActive: true,
  animationDuration: 700,
  animationEasing: "ease-out" as const,
};

export function SpendingTrendChart() {
  const t = useTranslations("AnalyticsPage");
  const tCharts = useTranslations("DashboardCharts");
  const format = useFormatter();
  const { monthKey, setMonthKey, companyId, monthKeys } = useDashboard();
  const dataset = useDashboardDataset();
  const { currency } = useSettings();
  const [granularity, setGranularity] = useState<ChartGranularity>("year");
  const isNarrowViewport = useMediaQuery(CHART_NARROW_MEDIA_QUERY);

  const companyName = getCompanyName(companyId);

  const chartData = useMemo(() => {
    return getRevenueChartData(dataset, monthKey, granularity).map((point) => ({
      key: point.key,
      label: labelForRevenuePoint(point, granularity, format),
      income: point.income,
      expenses: point.expenses,
    }));
  }, [dataset, format, granularity, monthKey]);

  const isScrollable = isRevenueChartScrollable(granularity, isNarrowViewport);
  const chartKey = `${companyId}-${monthKey}-${granularity}-spending-trend`;

  const yAxisMax = useMemo(
    () => niceAxisMax(peakRevenueValue(chartData, new Set())),
    [chartData],
  );

  const yAxisTicks = useMemo(() => buildYAxisTicks(yAxisMax), [yAxisMax]);

  return (
    <Card
      title={t("spendingTrendTitle")}
      description={t("spendingTrendDescription", { company: companyName })}
      action={
        <MonthPicker
          value={monthKey}
          onChange={setMonthKey}
          allowedMonthKeys={monthKeys}
        />
      }
    >
      <GranularityToggle value={granularity} onChange={setGranularity} />

      <div className="mt-2 min-w-0">
        <ScrollableChartShell
          isScrollable={isScrollable}
          dataPointCount={chartData.length}
          yAxisTicks={yAxisTicks}
          yAxisMax={yAxisMax}
          formatTick={(value) => formatChartCompact(format, value)}
        >
          {({ width, showStickyYAxis }) => (
            <ResponsiveContainer width={width} height={REVENUE_CHART_HEIGHT}>
              <LineChart
                key={chartKey}
                data={chartData}
                margin={
                  showStickyYAxis
                    ? REVENUE_CHART_MARGIN
                    : { top: 8, right: 8, left: 0, bottom: 8 }
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-zinc-200 dark:stroke-zinc-800"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  height={REVENUE_X_AXIS_HEIGHT}
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  interval={granularity === "year" ? 0 : "preserveStartEnd"}
                />
                {showStickyYAxis ? (
                  <YAxis hide domain={[0, yAxisMax]} allowDecimals={false} />
                ) : (
                  <YAxis
                    tick={{ fill: "currentColor", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      formatChartCompact(format, Number(value))
                    }
                  />
                )}
                <Tooltip
                  formatter={(value) => formatChartCurrency(format, value, currency)}
                  labelFormatter={(label) => label}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 12 }}
                />
                <Line
                  {...lineProps}
                  dataKey="income"
                  name={tCharts("income")}
                  stroke={REVENUE_SERIES_COLORS.income}
                  dot={{ ...lineProps.dot, fill: REVENUE_SERIES_COLORS.income }}
                  animationBegin={0}
                />
                <Line
                  {...lineProps}
                  dataKey="expenses"
                  name={tCharts("expenses")}
                  stroke={REVENUE_SERIES_COLORS.expenses}
                  dot={{ ...lineProps.dot, fill: REVENUE_SERIES_COLORS.expenses }}
                  animationBegin={80}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ScrollableChartShell>
      </div>
    </Card>
  );
}
