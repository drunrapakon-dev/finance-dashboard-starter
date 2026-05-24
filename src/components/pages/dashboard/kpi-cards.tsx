"use client";

import { Card } from "@/components/custom/card/card";
import { useDashboard, useDashboardDataset } from "@/context/dashboard-context";
import { useFormatCurrency } from "@/hooks/use-format-currency";
import { formatPercent } from "@/lib/format/currency";
import type { KpiMetricKey } from "@/lib/mock/dashboard-kpi";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

const kpiMetrics: KpiMetricKey[] = [
  "totalBalance",
  "income",
  "expenses",
  "cashflow",
];

const kpiTitleKeys: Record<KpiMetricKey, "totalBalance" | "income" | "expenses" | "cashflow"> =
  {
    totalBalance: "totalBalance",
    income: "income",
    expenses: "expenses",
    cashflow: "cashflow",
  };

export function KpiCards() {
  const t = useTranslations("DashboardKpi");
  const locale = useLocale();
  const formatMoney = useFormatCurrency();
  const { monthKey } = useDashboard();
  const dataset = useDashboardDataset();

  const { currentSnapshot, previousSnapshot } = useMemo(() => {
    const monthIndex = dataset.kpiSnapshots.findIndex(
      (snapshot) => snapshot.monthKey === monthKey,
    );
    const current = dataset.kpiSnapshots[monthIndex] ?? dataset.kpiSnapshots.at(-1)!;
    const previous = dataset.kpiSnapshots[monthIndex - 1] ?? current;
    return { currentSnapshot: current, previousSnapshot: previous };
  }, [dataset.kpiSnapshots, monthKey]);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiMetrics.map((metric) => {
        const currentValue = currentSnapshot[metric];
        const previousValue = previousSnapshot[metric];
        const changePercent =
          previousValue === 0
            ? 0
            : ((currentValue - previousValue) / previousValue) * 100;
        const isExpenseMetric = metric === "expenses";
        const isTrendPositive = isExpenseMetric
          ? changePercent < 0
          : changePercent >= 0;

        return (
          <Card
            key={metric}
            title={t(kpiTitleKeys[metric])}
            description={t("vsLastMonth", {
              value: formatPercent(changePercent, locale),
            })}
          >
            <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {formatMoney(currentValue)}
            </p>
            <p
              className={`mt-2 text-xs font-medium ${
                isTrendPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {changePercent >= 0 ? "↑" : "↓"}{" "}
              {formatPercent(Math.abs(changePercent), locale)}
            </p>
          </Card>
        );
      })}
    </section>
  );
}
