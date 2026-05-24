"use client";

import { StickyYAxis } from "@/components/custom/chart/sticky-y-axis";
import {
  REVENUE_BAR_MIN_SCROLL_WIDTH,
  REVENUE_BAR_SLOT_WIDTH,
  REVENUE_CHART_HEIGHT,
} from "@/lib/chart/constants";
import type { ReactNode } from "react";

type ScrollableChartShellProps = {
  isScrollable: boolean;
  dataPointCount: number;
  yAxisTicks: number[];
  yAxisMax: number;
  formatTick: (value: number) => string;
  children: (props: {
    width: number | "100%";
    showStickyYAxis: boolean;
  }) => ReactNode;
};

export function ScrollableChartShell({
  isScrollable,
  dataPointCount,
  yAxisTicks,
  yAxisMax,
  formatTick,
  children,
}: ScrollableChartShellProps) {
  const scrollWidth = Math.max(
    dataPointCount * REVENUE_BAR_SLOT_WIDTH,
    REVENUE_BAR_MIN_SCROLL_WIDTH,
  );

  if (!isScrollable) {
    return (
      <div className="h-full w-full min-w-0" style={{ height: REVENUE_CHART_HEIGHT }}>
        {children({ width: "100%", showStickyYAxis: false })}
      </div>
    );
  }

  return (
    <div className="flex w-full" style={{ height: REVENUE_CHART_HEIGHT }}>
      <StickyYAxis ticks={yAxisTicks} max={yAxisMax} formatTick={formatTick} />

      <div
        className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden"
        style={{ height: REVENUE_CHART_HEIGHT }}
      >
        <div style={{ width: scrollWidth, height: REVENUE_CHART_HEIGHT }}>
          {children({ width: scrollWidth, showStickyYAxis: true })}
        </div>
      </div>
    </div>
  );
}
