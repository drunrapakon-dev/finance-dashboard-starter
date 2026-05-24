"use client";

import { ShellPageLayout } from "@/components/layout/shell-page-layout";
import { DashboardDataGate } from "@/components/pages/dashboard/dashboard-data-gate";
import { DashboardPageSkeleton } from "@/components/pages/dashboard/dashboard-skeletons";
import { DashboardToolbar } from "@/components/pages/dashboard/dashboard-toolbar";
import { ExpenseCategoriesChart } from "@/components/pages/dashboard/expense-categories-chart";
import { KpiCards } from "@/components/pages/dashboard/kpi-cards";
import { RecentTransactions } from "@/components/pages/dashboard/recent-transactions";
import { RevenueOverviewChart } from "@/components/pages/dashboard/revenue-overview-chart";
import { useTranslations } from "next-intl";

export function DashboardPageContent() {
  const t = useTranslations("DashboardPage");

  return (
    <ShellPageLayout
      title={t("title")}
      description={t("description")}
      toolbar={<DashboardToolbar />}
    >
      <DashboardDataGate skeleton={<DashboardPageSkeleton />}>
        <KpiCards />

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <RevenueOverviewChart />
          <ExpenseCategoriesChart />
        </section>

        <div className="mt-6">
          <RecentTransactions />
        </div>
      </DashboardDataGate>
    </ShellPageLayout>
  );
}
