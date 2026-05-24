"use client";

import { CategoryBadge } from "@/components/custom/badge/category-badge";
import { Card } from "@/components/custom/card/card";
import { ShellPageLayout } from "@/components/layout/shell-page-layout";
import { DashboardToolbar } from "@/components/pages/dashboard/dashboard-toolbar";
import { useDashboard } from "@/context/dashboard-context";
import { useFormatCurrency } from "@/hooks/use-format-currency";
import { getExpenseCategoriesFromTransactions } from "@/lib/mock/chart-data";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

export function CategoriesPageContent() {
  const t = useTranslations("CategoriesPage");
  const tCharts = useTranslations("DashboardCharts");
  const formatMoney = useFormatCurrency();
  const format = useFormatter();
  const { dataset, monthKey } = useDashboard();

  const monthLabel = format.dateTime(new Date(`${monthKey}-01`), {
    month: "long",
    year: "numeric",
  });

  const categories = useMemo(
    () => getExpenseCategoriesFromTransactions(dataset, monthKey),
    [dataset, monthKey],
  );

  const total = useMemo(
    () => categories.reduce((sum, category) => sum + category.amount, 0),
    [categories],
  );

  return (
    <ShellPageLayout
      title={t("title")}
      description={t("description", { month: monthLabel })}
      toolbar={<DashboardToolbar />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const share = total > 0 ? (category.amount / total) * 100 : 0;

          return (
            <Card
              key={category.key}
              title={tCharts(`categories.${category.key}`)}
              description={t("share", { value: share.toFixed(1) })}
            >
              <div className="flex items-center justify-between gap-3">
                <CategoryBadge category={category.key}>
                  {tCharts(`categories.${category.key}`)}
                </CategoryBadge>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatMoney(category.amount)}
                </p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{ width: `${share}%`, backgroundColor: category.color }}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </ShellPageLayout>
  );
}
