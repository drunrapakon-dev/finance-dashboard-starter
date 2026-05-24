"use client";

import { Badge, type BadgeVariant } from "@/components/custom/badge/badge";
import { CategoryBadge } from "@/components/custom/badge/category-badge";
import { Card } from "@/components/custom/card/card";
import { DataTable, type TableColumn, type TableFilter } from "@/components/custom/table/table";
import { useDashboard, useDashboardDataset } from "@/context/dashboard-context";
import { useFormatCurrency } from "@/hooks/use-format-currency";
import { expenseCategoryKeys } from "@/lib/mock/expense-categories";
import type { Transaction, TransactionStatus } from "@/lib/mock/transactions";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

const statusBadgeVariants: Record<TransactionStatus, BadgeVariant> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};

export function RecentTransactions() {
  const t = useTranslations("DashboardTransactions");
  const formatMoney = useFormatCurrency();
  const format = useFormatter();
  const { monthKeys } = useDashboard();
  const dataset = useDashboardDataset();

  const dateBounds = useMemo(() => {
    const dates = dataset.transactions.map((transaction) => transaction.date).sort();
    return {
      min: dates[0] ?? monthKeys[0] + "-01",
      max: dates.at(-1) ?? monthKeys.at(-1) + "-31",
    };
  }, [dataset.transactions]);

  const columns = useMemo<TableColumn<Transaction>[]>(
    () => [
      {
        key: "date",
        header: t("columns.date"),
        cell: (row) =>
          format.dateTime(new Date(row.date), {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
      {
        key: "description",
        header: t("columns.description"),
        cell: (row) => <span className="font-medium">{row.description}</span>,
      },
      {
        key: "category",
        header: t("columns.category"),
        cell: (row) => (
          <CategoryBadge category={row.category}>
            {t(`categories.${row.category}`)}
          </CategoryBadge>
        ),
      },
      {
        key: "amount",
        header: t("columns.amount"),
        className: "text-right",
        cell: (row) => (
          <span
            className={`font-medium ${
              row.amount >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-900 dark:text-zinc-50"
            }`}
          >
            {formatMoney(row.amount)}
          </span>
        ),
      },
      {
        key: "status",
        header: t("columns.status"),
        cell: (row) => (
          <Badge variant={statusBadgeVariants[row.status]}>
            {t(`status.${row.status}`)}
          </Badge>
        ),
      },
    ],
    [format, formatMoney, t],
  );

  const filters = useMemo<TableFilter<Transaction>[]>(
    () => [
      {
        id: "category",
        label: t("filters.category"),
        options: [
          { value: "all", label: t("filters.all") },
          ...expenseCategoryKeys.map((key) => ({
            value: key,
            label: t(`categories.${key}`),
          })),
        ],
        match: (row, value) => row.category === value,
      },
      {
        id: "status",
        label: t("filters.status"),
        options: [
          { value: "all", label: t("filters.all") },
          { value: "completed", label: t("status.completed") },
          { value: "pending", label: t("status.pending") },
          { value: "failed", label: t("status.failed") },
        ],
        match: (row, value) => row.status === value,
      },
    ],
    [t],
  );

  return (
    <Card title={t("title")} description={t("description")}>
      <DataTable
        data={dataset.transactions}
        columns={columns}
        getRowKey={(row) => row.id}
        filters={filters}
        dateRangeFilter={{
          getDate: (row) => row.date,
          fromLabel: t("dateRange.from"),
          toLabel: t("dateRange.to"),
          min: dateBounds.min,
          max: dateBounds.max,
        }}
        pageSize={6}
        searchPlaceholder={t("searchPlaceholder")}
        searchMatch={(row, query) =>
          row.description.toLowerCase().includes(query) ||
          t(`categories.${row.category}`).toLowerCase().includes(query)
        }
        emptyMessage={t("empty")}
        previousLabel={t("pagination.previous")}
        nextLabel={t("pagination.next")}
        pageLabel={(current, total) => t("pagination.page", { current, total })}
      />
    </Card>
  );
}
