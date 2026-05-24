import {
  expenseCategoryColors,
  expenseCategoryKeys,
  getCategoryBaseAmount,
  type ExpenseCategoryKey,
} from "@/lib/mock/expense-categories";
import type { MonthlyKpiSnapshot } from "@/lib/mock/dashboard-kpi";
import type { Transaction, TransactionStatus } from "@/lib/mock/transactions";

export type Company = {
  id: string;
  name: string;
};

export const mockCompanies: Company[] = [
  { id: "acme", name: "Acme Finance" },
  { id: "northwind", name: "Northwind Capital" },
  { id: "blueriver", name: "BlueRiver Labs" },
  { id: "summit", name: "Summit Holdings" },
  { id: "horizon", name: "Horizon Payments" },
  { id: "orion", name: "Orion Ventures" },
  { id: "novaledger", name: "NovaLedger" },
  { id: "sterling", name: "Sterling Axis" },
  { id: "primeflow", name: "PrimeFlow Inc" },
  { id: "atlas", name: "Atlas Meridian" },
];

export const availableYears = [2025, 2026] as const;

export function buildMonthKeys() {
  const keys: string[] = [];

  for (let month = 1; month <= 12; month += 1) {
    keys.push(`2025-${String(month).padStart(2, "0")}`);
  }

  for (let month = 1; month <= 3; month += 1) {
    keys.push(`2026-${String(month).padStart(2, "0")}`);
  }

  return keys as readonly string[];
}

export const monthKeys = buildMonthKeys();
export type MonthKey = (typeof monthKeys)[number];

export function isMonthKeyAvailable(year: number, monthIndex: number) {
  if (year === 2025) {
    return monthIndex >= 0 && monthIndex <= 11;
  }

  if (year === 2026) {
    return monthIndex >= 0 && monthIndex <= 2;
  }

  return false;
}

export function toMonthKey(year: number, monthIndex: number): MonthKey | null {
  if (!isMonthKeyAvailable(year, monthIndex)) {
    return null;
  }

  return `${year}-${String(monthIndex + 1).padStart(2, "0")}` as MonthKey;
}

export function getMonthKeysForYear(year: number) {
  return monthKeys.filter((key) => key.startsWith(`${year}-`));
}

export type ExpenseCategorySnapshot = {
  key: ExpenseCategoryKey;
  amount: number;
  color: string;
};

export type CompanyDataset = {
  kpiSnapshots: MonthlyKpiSnapshot[];
  expenseCategoriesByMonth: Record<string, ExpenseCategorySnapshot[]>;
  transactions: Transaction[];
};

const transactionTemplates: Array<{
  description: string;
  category: ExpenseCategoryKey;
  amount: number;
  status: TransactionStatus;
}> = [
  { description: "Adobe Subscription", category: "software_subscriptions", amount: -54.99, status: "completed" },
  { description: "Spotify Team Plan", category: "software_subscriptions", amount: -29, status: "completed" },
  { description: "AWS Hosting", category: "cloud_hosting", amount: -420, status: "completed" },
  { description: "Client Payment", category: "sales_revenue", amount: 12_400, status: "completed" },
  { description: "Payroll", category: "payroll", amount: -15_200, status: "completed" },
  { description: "Monthly office rent", category: "rent_lease", amount: -3_200, status: "completed" },
  { description: "Health insurance premium", category: "employee_benefits", amount: -2_800, status: "completed" },
  { description: "Google Ads campaign", category: "advertising", amount: -920, status: "pending" },
  { description: "Freelance design contractor", category: "contractors", amount: -1_850, status: "completed" },
  { description: "Annual audit fee", category: "accounting_audit", amount: -2_800, status: "completed" },
  { description: "Business travel — client visit", category: "travel", amount: -640, status: "completed" },
  { description: "Team lunch", category: "meals_entertainment", amount: -186, status: "completed" },
  { description: "Electricity & water", category: "utilities", amount: -540, status: "completed" },
  { description: "Office supplies restock", category: "office_supplies", amount: -245, status: "completed" },
  { description: "Legal retainer", category: "legal_fees", amount: -1_200, status: "completed" },
  { description: "Bank service charges", category: "bank_fees", amount: -95, status: "completed" },
  { description: "Business liability insurance", category: "insurance", amount: -1_400, status: "completed" },
  { description: "Corporate tax installment", category: "taxes_licenses", amount: -2_200, status: "completed" },
  { description: "Consulting — strategy", category: "consulting", amount: -3_500, status: "completed" },
  { description: "Trade show sponsorship", category: "marketing_events", amount: -2_100, status: "completed" },
  { description: "Sales commission payout", category: "sales_commissions", amount: -3_600, status: "completed" },
  { description: "Courier & freight", category: "shipping_freight", amount: -180, status: "completed" },
  { description: "Internet & phone", category: "telecommunications", amount: -380, status: "completed" },
  { description: "Laptop replacement", category: "hardware_equipment", amount: -1_450, status: "completed" },
  { description: "Facility maintenance", category: "facilities_maintenance", amount: -650, status: "completed" },
  { description: "Interest on credit line", category: "interest_expense", amount: -340, status: "completed" },
  { description: "Asset depreciation", category: "depreciation", amount: -1_800, status: "completed" },
  { description: "Project milestone payment", category: "service_revenue", amount: 8_600, status: "completed" },
  { description: "Miscellaneous income", category: "other_income", amount: 750, status: "completed" },
];

const transactionDays = [3, 6, 9, 12, 15, 18, 21, 24, 26, 28];

function scale(value: number, companyIndex: number, monthIndex: number) {
  const yearOffset = Math.floor(monthIndex / 12);
  const monthInYear = monthIndex % 12;
  const factor = 1 + companyIndex * 0.05 + yearOffset * 0.08 + monthInYear * 0.03;
  return Math.round(value * factor);
}

function buildCompanyDataset(companyIndex: number): CompanyDataset {
  const kpiSnapshots: MonthlyKpiSnapshot[] = monthKeys.map((monthKey, monthIndex) => {
    const income = scale(45_000, companyIndex, monthIndex);
    const expenses = scale(33_000, companyIndex, monthIndex);

    return {
      monthKey,
      totalBalance: scale(118_000 + monthIndex * 2_500, companyIndex, monthIndex),
      income,
      expenses,
      cashflow: income - expenses,
    };
  });

  const expenseCategoriesByMonth = Object.fromEntries(
    monthKeys.map((monthKey, monthIndex) => {
      const categories = expenseCategoryKeys.map((key) => ({
        key,
        amount: scale(getCategoryBaseAmount(key), companyIndex, monthIndex),
        color: expenseCategoryColors[key],
      }));

      return [monthKey, categories];
    }),
  );

  const transactions: Transaction[] = [];

  for (const monthKey of monthKeys) {
    const globalMonthIndex = monthKeys.indexOf(monthKey as MonthKey);

    transactionTemplates.forEach((template, templateIndex) => {
      const day = transactionDays[templateIndex % transactionDays.length];
      const factor = 1 + companyIndex * 0.05 + globalMonthIndex * 0.01;

      transactions.push({
        id: `txn-${companyIndex + 1}-${monthKey}-${templateIndex}`,
        date: `${monthKey}-${String(day).padStart(2, "0")}`,
        description: template.description,
        category: template.category,
        amount: Math.round(template.amount * factor),
        status: template.status,
      });
    });
  }

  transactions.sort((a, b) => a.date.localeCompare(b.date));

  return {
    kpiSnapshots,
    expenseCategoriesByMonth,
    transactions,
  };
}

export const companyDatasets: Record<string, CompanyDataset> = Object.fromEntries(
  mockCompanies.map((company, index) => [company.id, buildCompanyDataset(index)]),
);

export function getCompanyDataset(companyId: string) {
  return companyDatasets[companyId] ?? companyDatasets[mockCompanies[0].id];
}

export function getCompanyName(companyId: string) {
  return (
    mockCompanies.find((company) => company.id === companyId)?.name ??
    mockCompanies[0].name
  );
}
