import {
  REVENUE_CHART_HEIGHT,
  REVENUE_PLOT_HEIGHT,
  REVENUE_X_AXIS_HEIGHT,
  REVENUE_Y_AXIS_WIDTH,
} from "@/lib/chart/constants";

type StickyYAxisProps = {
  ticks: number[];
  max: number;
  formatTick: (value: number) => string;
};

export function StickyYAxis({ ticks, max, formatTick }: StickyYAxisProps) {
  return (
    <div
      className="relative z-10 shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      style={{ width: REVENUE_Y_AXIS_WIDTH, height: REVENUE_CHART_HEIGHT }}
      aria-hidden
    >
      {ticks.map((tick) => (
        <span
          key={tick}
          className="absolute right-1 -translate-y-1/2 text-right text-xs tabular-nums text-zinc-600 dark:text-zinc-400"
          style={{
            bottom: REVENUE_X_AXIS_HEIGHT + (tick / max) * REVENUE_PLOT_HEIGHT,
          }}
        >
          {formatTick(tick)}
        </span>
      ))}
    </div>
  );
}
