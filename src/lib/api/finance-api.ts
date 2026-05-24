import {
  getCompanyDataset,
  mockCompanies,
  monthKeys,
  type CompanyDataset,
} from "@/lib/mock/companies";
import type { Transaction } from "@/lib/mock/transactions";
import { API_DELAY_MS } from "./config";
import type {
  ApiMeta,
  ApiResponse,
  CompaniesResponse,
  CompanyDatasetResponse,
  MonthKeysResponse,
  TransactionFilters,
  TransactionsResponse,
} from "./types";

function simulateDelay<T>(data: T): Promise<T> {
  if (API_DELAY_MS <= 0) {
    return Promise.resolve(data);
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), API_DELAY_MS);
  });
}

function withMeta<T>(data: T): ApiResponse<T> {
  const meta: ApiMeta = { simulated: true };
  return { data, meta };
}

function filterTransactions(
  dataset: CompanyDataset,
  filters?: TransactionFilters,
): Transaction[] {
  if (!filters?.monthKey) {
    return dataset.transactions;
  }

  return dataset.transactions.filter((transaction) =>
    transaction.date.startsWith(filters.monthKey!),
  );
}

/**
 * Fake async API — returns mock data after a short delay.
 * Replace each method with `fetch()` when you connect a real backend.
 */
export const financeApi = {
  getCompanies(): Promise<CompaniesResponse> {
    return simulateDelay(withMeta(mockCompanies));
  },

  getCompanyDataset(companyId: string): Promise<CompanyDatasetResponse> {
    return simulateDelay(withMeta(getCompanyDataset(companyId)));
  },

  getTransactions(
    companyId: string,
    filters?: TransactionFilters,
  ): Promise<TransactionsResponse> {
    const dataset = getCompanyDataset(companyId);
    return simulateDelay(withMeta(filterTransactions(dataset, filters)));
  },

  getMonthKeys(): Promise<MonthKeysResponse> {
    return simulateDelay(withMeta(monthKeys));
  },
};
