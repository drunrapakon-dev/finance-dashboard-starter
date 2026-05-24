"use client";

import {
  BAR_ANIMATION,
  CHART_TOOLTIP_STYLE,
  REVENUE_BAR_MIN_SCROLL_WIDTH,
  REVENUE_BAR_SLOT_WIDTH,
  REVENUE_CHART_HEIGHT,
  REVENUE_CHART_MARGIN,
  REVENUE_SERIES_COLORS,
  REVENUE_X_AXIS_HEIGHT,
  type RevenueSeriesKey,
} from "@/lib/chart/constants";
import { useSettings } from "@/context/settings-context";
import { formatChartCurrency } from "@/lib/chart/format";
import type { ChartGranularity, RevenueChartPoint } from "@/lib/mock/chart-data";
import type { useFormatter } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartFormatter = ReturnType<typeof useFormatter>;

type RevenueBarChartProps = {
  chartKey: string;
  chartData: RevenueChartPoint[];
  granularity: ChartGranularity;
  hiddenKeys: Set<string>;
  yAxisMax: number;
  isScrollable: boolean;
  format: ChartFormatter;
  labels: Record<RevenueSeriesKey, string>;
};

export function RevenueBarChart({
  chartKey,
  chartData,
  granularity,
  hiddenKeys,
  yAxisMax,
  isScrollable,
  format,
  labels,
}: RevenueBarChartProps) {
  const { currency } = useSettings();
  const scrollWidth = Math.max(
    chartData.length * REVENUE_BAR_SLOT_WIDTH,
    REVENUE_BAR_MIN_SCROLL_WIDTH,
  );

  return (
    <div
      className={`min-w-0 flex-1 overflow-y-hidden ${isScrollable ? "overflow-x-auto" : ""}`}
      style={{ height: REVENUE_CHART_HEIGHT }}
    >
      <div
        className={isScrollable ? undefined : "h-full w-full"}
        style={
          isScrollable
            ? { width: scrollWidth, height: REVENUE_CHART_HEIGHT }
            : { height: REVENUE_CHART_HEIGHT }
        }
      >
        <ResponsiveContainer
          width={isScrollable ? scrollWidth : "100%"}
          height={REVENUE_CHART_HEIGHT}
        >
          <BarChart
            key={chartKey}
            data={chartData}
            margin={REVENUE_CHART_MARGIN}
            barCategoryGap={isScrollable ? "20%" : "12%"}
            barGap={4}
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
            <YAxis hide domain={[0, yAxisMax]} allowDecimals={false} />
            <Tooltip
              formatter={(value) => formatChartCurrency(format, value, currency)}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar
              dataKey="income"
              name={labels.income}
              fill={REVENUE_SERIES_COLORS.income}
              radius={[6, 6, 0, 0]}
              hide={hiddenKeys.has("income")}
              isAnimationActive
              animationDuration={BAR_ANIMATION.duration}
              animationEasing={BAR_ANIMATION.easing}
              animationBegin={0}
            />
            <Bar
              dataKey="expenses"
              name={labels.expenses}
              fill={REVENUE_SERIES_COLORS.expenses}
              radius={[6, 6, 0, 0]}
              hide={hiddenKeys.has("expenses")}
              isAnimationActive
              animationDuration={BAR_ANIMATION.duration}
              animationEasing={BAR_ANIMATION.easing}
              animationBegin={BAR_ANIMATION.expensesDelay}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
