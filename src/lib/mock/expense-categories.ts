export const expenseCategoryDefinitions = {
  sales_revenue: { color: "#10b981", baseAmount: 12_400, group: "income" },
  service_revenue: { color: "#14b8a6", baseAmount: 8_600, group: "income" },
  other_income: { color: "#22c55e", baseAmount: 1_800, group: "income" },

  payroll: { color: "#8b5cf6", baseAmount: 15_200, group: "expense" },
  employee_benefits: { color: "#a78bfa", baseAmount: 2_800, group: "expense" },
  contractors: { color: "#c084fc", baseAmount: 4_500, group: "expense" },

  software_subscriptions: { color: "#3b82f6", baseAmount: 890, group: "expense" },
  cloud_hosting: { color: "#2563eb", baseAmount: 420, group: "expense" },
  hardware_equipment: { color: "#1d4ed8", baseAmount: 2_100, group: "expense" },
  telecommunications: { color: "#60a5fa", baseAmount: 380, group: "expense" },

  rent_lease: { color: "#64748b", baseAmount: 3_200, group: "expense" },
  utilities: { color: "#475569", baseAmount: 540, group: "expense" },
  office_supplies: { color: "#94a3b8", baseAmount: 320, group: "expense" },
  facilities_maintenance: { color: "#78716c", baseAmount: 650, group: "expense" },

  advertising: { color: "#ec4899", baseAmount: 1_800, group: "expense" },
  marketing_events: { color: "#f472b6", baseAmount: 2_400, group: "expense" },
  sales_commissions: { color: "#db2777", baseAmount: 3_600, group: "expense" },

  legal_fees: { color: "#f97316", baseAmount: 1_200, group: "expense" },
  accounting_audit: { color: "#ea580c", baseAmount: 2_800, group: "expense" },
  consulting: { color: "#fb923c", baseAmount: 3_500, group: "expense" },

  travel: { color: "#0ea5e9", baseAmount: 1_100, group: "expense" },
  meals_entertainment: { color: "#f59e0b", baseAmount: 480, group: "expense" },
  shipping_freight: { color: "#0284c7", baseAmount: 720, group: "expense" },

  bank_fees: { color: "#71717a", baseAmount: 95, group: "expense" },
  insurance: { color: "#52525b", baseAmount: 1_400, group: "expense" },
  taxes_licenses: { color: "#a16207", baseAmount: 2_200, group: "expense" },
  depreciation: { color: "#6b7280", baseAmount: 1_800, group: "expense" },
  interest_expense: { color: "#57534e", baseAmount: 340, group: "expense" },
} as const;

export type ExpenseCategoryKey = keyof typeof expenseCategoryDefinitions;

export const expenseCategoryKeys = Object.keys(
  expenseCategoryDefinitions,
) as ExpenseCategoryKey[];

export const expenseCategoryColors: Record<ExpenseCategoryKey, string> =
  Object.fromEntries(
    expenseCategoryKeys.map((key) => [key, expenseCategoryDefinitions[key].color]),
  ) as Record<ExpenseCategoryKey, string>;

export function getCategoryBaseAmount(key: ExpenseCategoryKey) {
  return expenseCategoryDefinitions[key].baseAmount;
}

export type ExpenseCategorySnapshot = {
  key: ExpenseCategoryKey;
  amount: number;
  color: string;
};

export const mockExpenseCategories: ExpenseCategorySnapshot[] =
  expenseCategoryKeys.map((key) => ({
    key,
    amount: expenseCategoryDefinitions[key].baseAmount,
    color: expenseCategoryColors[key],
  }));
