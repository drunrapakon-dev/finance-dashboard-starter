/** Viewports at or below this width (i.e. below 425px) use narrow chart scroll rules. */
export const CHART_NARROW_MAX_WIDTH = 424;

export const REVENUE_CHART_HEIGHT = 288;
export const REVENUE_Y_AXIS_WIDTH = 56;
export const REVENUE_X_AXIS_HEIGHT = 32;
export const REVENUE_BAR_SLOT_WIDTH = 56;
export const REVENUE_BAR_MIN_SCROLL_WIDTH = 280;

export const REVENUE_CHART_MARGIN = {
  top: 8,
  right: 8,
  left: 0,
  bottom: 0,
} as const;

export const REVENUE_PLOT_HEIGHT =
  REVENUE_CHART_HEIGHT - REVENUE_CHART_MARGIN.top - REVENUE_X_AXIS_HEIGHT;

export const REVENUE_SERIES = ["income", "expenses"] as const;
export type RevenueSeriesKey = (typeof REVENUE_SERIES)[number];

export const REVENUE_SERIES_COLORS: Record<RevenueSeriesKey, string> = {
  income: "#10b981",
  expenses: "#f43f5e",
};

export const CHART_TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid var(--border, #e4e4e7)",
} as const;

export const BAR_ANIMATION = {
  duration: 600,
  easing: "ease-out" as const,
  expensesDelay: 80,
};
