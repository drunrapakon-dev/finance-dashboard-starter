import type { Company, CompanyDataset, MonthKey } from "@/lib/mock/companies";
import type { Transaction } from "@/lib/mock/transactions";

export type ApiMeta = {
  simulated: true;
};

export type ApiResponse<T> = {
  data: T;
  meta: ApiMeta;
};

export type CompaniesResponse = ApiResponse<Company[]>;

export type CompanyDatasetResponse = ApiResponse<CompanyDataset>;

export type TransactionsResponse = ApiResponse<Transaction[]>;

export type MonthKeysResponse = ApiResponse<readonly MonthKey[]>;

export type TransactionFilters = {
  monthKey?: MonthKey;
};
