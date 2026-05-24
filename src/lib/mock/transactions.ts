import type { ExpenseCategoryKey } from "@/lib/mock/expense-categories";

export type TransactionStatus = "completed" | "pending" | "failed";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: ExpenseCategoryKey;
  amount: number;
  status: TransactionStatus;
};
