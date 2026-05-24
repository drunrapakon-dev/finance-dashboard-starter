"use client";

import { Card } from "@/components/custom/card/card";
import { ChartLegendToggle } from "@/components/custom/chart/chart-legend-toggle";
import { MonthPicker } from "@/components/custom/month-picker/month-picker";
import { useDashboard } from "@/context/dashboard-context";
import { useSettings } from "@/context/settings-context";
import { useHiddenKeys } from "@/hooks/use-hidden-keys";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart/constants";
import { formatChartCurrency } from "@/lib/chart/format";
import { getCompanyName } from "@/lib/mock/companies";
import { getExpenseCategoriesFromTransactions } from "@/lib/mock/chart-data";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function ExpenseCategoriesChart() {
  const t = useTranslations("DashboardCharts");
  const format = useFormatter();
  const { dataset, monthKey, setMonthKey, companyId } = useDashboard();
  const { currency } = useSettings();
  const { hiddenKeys, toggle: toggleCategory } = useHiddenKeys(
    `${companyId}-${monthKey}`,
  );

  const companyName = getCompanyName(companyId);

  const monthLabel = format.dateTime(new Date(`${monthKey}-01`), {
    month: "long",
    year: "numeric",
  });

  const allChartData = useMemo(() => {
    return getExpenseCategoriesFromTransactions(dataset, monthKey).map(
      (category) => ({
        key: category.key,
        name: t(`categories.${category.key}`),
        value: category.amount,
        color: category.color,
      }),
    );
  }, [dataset, monthKey, t]);

  const chartData = useMemo(
    () => allChartData.filter((entry) => !hiddenKeys.has(entry.key)),
    [allChartData, hiddenKeys],
  );

  const legendItems = useMemo(
    () =>
      allChartData.map((entry) => ({
        key: entry.key,
        label: entry.name,
        color: entry.color,
      })),
    [allChartData],
  );

  return (
    <Card
      title={t("expenseCategoriesTitle")}
      description={t("expenseCategoriesDescription", {
        company: companyName,
        month: monthLabel,
      })}
      action={<MonthPicker value={monthKey} onChange={setMonthKey} />}
    >
      <div className="mt-2 h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
            >
              {chartData.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatChartCurrency(format, value, currency)}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ChartLegendToggle
        items={legendItems}
        hiddenKeys={hiddenKeys}
        onToggle={toggleCategory}
      />
    </Card>
  );
}
