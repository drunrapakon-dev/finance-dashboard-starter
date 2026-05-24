"use client";

import { ShellPageLayout } from "@/components/layout/shell-page-layout";
import { SpendingTrendChart } from "@/components/pages/analytics/spending-trend-chart";
import { DashboardDataGate } from "@/components/pages/dashboard/dashboard-data-gate";
import { AnalyticsPageSkeleton } from "@/components/pages/dashboard/dashboard-skeletons";
import { DashboardToolbar } from "@/components/pages/dashboard/dashboard-toolbar";
import { ExpenseCategoriesChart } from "@/components/pages/dashboard/expense-categories-chart";
import { KpiCards } from "@/components/pages/dashboard/kpi-cards";
import { RevenueOverviewChart } from "@/components/pages/dashboard/revenue-overview-chart";
import { useTranslations } from "next-intl";

export function AnalyticsPageContent() {
  const t = useTranslations("AnalyticsPage");

  return (
    <ShellPageLayout
      title={t("title")}
      description={t("description")}
      toolbar={<DashboardToolbar />}
    >
      <DashboardDataGate skeleton={<AnalyticsPageSkeleton />}>
        <KpiCards />

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <RevenueOverviewChart />
          <ExpenseCategoriesChart />
        </section>

        <div className="mt-6">
          <SpendingTrendChart />
        </div>
      </DashboardDataGate>
    </ShellPageLayout>
  );
}
