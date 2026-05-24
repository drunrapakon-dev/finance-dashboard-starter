import { expenseCategoryColors } from "@/lib/mock/expense-categories";
import type { ExpenseCategoryKey } from "@/lib/mock/expense-categories";
import type { CompanyDataset, MonthKey } from "@/lib/mock/companies";
import { monthKeys, toMonthKey } from "@/lib/mock/companies";

export type ChartGranularity = "year" | "month" | "week" | "day";

export type RevenueChartPoint = {
  key: string;
  label: string;
  income: number;
  expenses: number;
};

type Totals = { income: number; expenses: number };

function sumByTransactions(
  transactions: CompanyDataset["transactions"],
  predicate: (date: string) => boolean,
): Totals {
  let income = 0;
  let expenses = 0;

  for (const transaction of transactions) {
    if (!predicate(transaction.date)) {
      continue;
    }

    if (transaction.amount >= 0) {
      income += transaction.amount;
    } else {
      expenses += Math.abs(transaction.amount);
    }
  }

  return { income, expenses };
}

function applyTransaction(totals: Totals, amount: number) {
  if (amount >= 0) {
    totals.income += amount;
  } else {
    totals.expenses += Math.abs(amount);
  }
}

function toRevenuePoint(
  dataset: CompanyDataset,
  key: string,
  label: string,
): RevenueChartPoint {
  const snapshot = dataset.kpiSnapshots.find((item) => item.monthKey === key);
  const totals = sumByTransactions(dataset.transactions, (date) =>
    date.startsWith(key),
  );

  return {
    key,
    label,
    income: snapshot?.income ?? totals.income,
    expenses: snapshot?.expenses ?? totals.expenses,
  };
}

function getWeekIndex(day: number) {
  return Math.min(4, Math.ceil(day / 7));
}

function buildYearlyPoints(dataset: CompanyDataset, monthKey: MonthKey) {
  const year = Number(monthKey.split("-")[0]);

  return Array.from({ length: 12 }, (_, index) => {
    const key = `${year}-${String(index + 1).padStart(2, "0")}`;
    return toRevenuePoint(dataset, key, key);
  });
}

function buildWeeklyPoints(dataset: CompanyDataset, monthKey: MonthKey) {
  const weekMap = new Map<number, Totals>();

  for (const transaction of dataset.transactions) {
    if (!transaction.date.startsWith(monthKey)) {
      continue;
    }

    const day = Number(transaction.date.split("-")[2]);
    const week = getWeekIndex(day);
    const current = weekMap.get(week) ?? { income: 0, expenses: 0 };
    applyTransaction(current, transaction.amount);
    weekMap.set(week, current);
  }

  return Array.from({ length: 4 }, (_, index) => {
    const week = index + 1;
    const totals = weekMap.get(week) ?? { income: 0, expenses: 0 };

    return {
      key: `week-${week}`,
      label: `W${week}`,
      income: totals.income,
      expenses: totals.expenses,
    };
  });
}

function buildDailyPoints(dataset: CompanyDataset, monthKey: MonthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayMap = new Map<number, Totals>();

  for (const transaction of dataset.transactions) {
    if (!transaction.date.startsWith(monthKey)) {
      continue;
    }

    const day = Number(transaction.date.split("-")[2]);
    const current = dayMap.get(day) ?? { income: 0, expenses: 0 };
    applyTransaction(current, transaction.amount);
    dayMap.set(day, current);
  }

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const totals = dayMap.get(day) ?? { income: 0, expenses: 0 };

    return {
      key: `day-${day}`,
      label: String(day),
      income: totals.income,
      expenses: totals.expenses,
    };
  });
}

export function getRevenueChartData(
  dataset: CompanyDataset,
  monthKey: MonthKey,
  granularity: ChartGranularity,
): RevenueChartPoint[] {
  switch (granularity) {
    case "year":
      return buildYearlyPoints(dataset, monthKey);
    case "month":
      return [toRevenuePoint(dataset, monthKey, monthKey)];
    case "week":
      return buildWeeklyPoints(dataset, monthKey);
    case "day":
      return buildDailyPoints(dataset, monthKey);
  }
}

export function getExpenseCategoriesFromTransactions(
  dataset: CompanyDataset,
  monthKey: MonthKey,
) {
  const totals = new Map<string, number>();

  for (const transaction of dataset.transactions) {
    if (!transaction.date.startsWith(monthKey) || transaction.amount >= 0) {
      continue;
    }

    totals.set(
      transaction.category,
      (totals.get(transaction.category) ?? 0) + Math.abs(transaction.amount),
    );
  }

  if (totals.size === 0) {
    return dataset.expenseCategoriesByMonth[monthKey] ?? [];
  }

  return Array.from(totals.entries()).map(([key, amount]) => ({
    key: key as ExpenseCategoryKey,
    amount,
    color: expenseCategoryColors[key as ExpenseCategoryKey] ?? "#64748b",
  }));
}

export function dateToMonthKey(date: string): MonthKey | null {
  const [year, month] = date.split("-").map(Number);
  return toMonthKey(year, month - 1);
}

export { monthKeys };
