"use client";

import { ShellPageLayout } from "@/components/layout/shell-page-layout";
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
      <KpiCards />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueOverviewChart />
        <ExpenseCategoriesChart />
      </section>

      <RecentTransactions />
    </ShellPageLayout>
  );
}
