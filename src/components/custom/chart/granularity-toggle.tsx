"use client";

import type { ChartGranularity } from "@/lib/mock/chart-data";
import { useTranslations } from "next-intl";

const granularities: ChartGranularity[] = ["year", "month", "week", "day"];

type GranularityToggleProps = {
  value: ChartGranularity;
  onChange: (granularity: ChartGranularity) => void;
};

export function GranularityToggle({ value, onChange }: GranularityToggleProps) {
  const t = useTranslations("DashboardCharts");

  return (
    <div className="mb-6 flex flex-wrap gap-1">
      {granularities.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            value === item
              ? "bg-emerald-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          {t(`granularity.${item}`)}
        </button>
      ))}
    </div>
  );
}
