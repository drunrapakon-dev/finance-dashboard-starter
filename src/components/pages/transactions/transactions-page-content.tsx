"use client";

import { ShellPageLayout } from "@/components/layout/shell-page-layout";
import { DashboardToolbar } from "@/components/pages/dashboard/dashboard-toolbar";
import { RecentTransactions } from "@/components/pages/dashboard/recent-transactions";
import { useTranslations } from "next-intl";

export function TransactionsPageContent() {
  const t = useTranslations("TransactionsPage");

  return (
    <ShellPageLayout
      title={t("title")}
      description={t("description")}
      toolbar={<DashboardToolbar />}
    >
      <RecentTransactions />
    </ShellPageLayout>
  );
}
