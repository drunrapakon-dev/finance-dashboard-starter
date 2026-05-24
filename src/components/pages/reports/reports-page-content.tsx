"use client";

import { Card } from "@/components/custom/card/card";
import { ShellPageLayout } from "@/components/layout/shell-page-layout";
import { DashboardToolbar } from "@/components/pages/dashboard/dashboard-toolbar";
import { useTranslations } from "next-intl";

const reportKeys = ["monthlySummary", "cashflow", "taxExport"] as const;

export function ReportsPageContent() {
  const t = useTranslations("ReportsPage");

  return (
    <ShellPageLayout
      title={t("title")}
      description={t("description")}
      toolbar={<DashboardToolbar />}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reportKeys.map((key) => (
          <Card
            key={key}
            title={t(`items.${key}.title`)}
            description={t(`items.${key}.description`)}
          >
            <button
              type="button"
              disabled
              className="mt-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-400 dark:border-zinc-700"
            >
              {t("comingSoon")}
            </button>
          </Card>
        ))}
      </div>
    </ShellPageLayout>
  );
}
