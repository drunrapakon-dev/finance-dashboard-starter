"use client";

import { financeApi } from "@/lib/api";
import type { Company, CompanyDataset, MonthKey } from "@/lib/mock/companies";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type DashboardContextValue = {
  companies: Company[];
  companyId: string;
  setCompanyId: (companyId: string) => void;
  monthKey: MonthKey;
  setMonthKey: (monthKey: MonthKey) => void;
  monthKeys: readonly MonthKey[];
  dataset: CompanyDataset | null;
  isLoading: boolean;
  error: string | null;
  refetchDataset: () => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [monthKeys, setMonthKeys] = useState<readonly MonthKey[]>([]);
  const [monthKey, setMonthKey] = useState<MonthKey>("2026-03");
  const [dataset, setDataset] = useState<CompanyDataset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datasetVersion, setDatasetVersion] = useState(0);

  const refetchDataset = useCallback(() => {
    setDatasetVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadCompanies() {
      try {
        const response = await financeApi.getCompanies();
        if (cancelled) {
          return;
        }

        const nextCompanies = response.data;
        setCompanies(nextCompanies);
        setCompanyId((current) =>
          nextCompanies.some((company) => company.id === current)
            ? current
            : (nextCompanies[0]?.id ?? ""),
        );
      } catch {
        if (!cancelled) {
          setError("Failed to load companies.");
        }
      }
    }

    loadCompanies();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMonthKeys() {
      try {
        const response = await financeApi.getMonthKeys();
        if (cancelled) {
          return;
        }

        const keys = response.data;
        setMonthKeys(keys);
        setMonthKey((current) =>
          keys.includes(current) ? current : (keys.at(-1) ?? current),
        );
      } catch {
        if (!cancelled) {
          setError("Failed to load available months.");
        }
      }
    }

    loadMonthKeys();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!companyId) {
      return;
    }

    let cancelled = false;

    async function loadDataset() {
      setIsLoading(true);
      setError(null);
      setDataset(null);

      try {
        const response = await financeApi.getCompanyDataset(companyId);
        if (!cancelled) {
          setDataset(response.data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load company data.");
          setDataset(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDataset();

    return () => {
      cancelled = true;
    };
  }, [companyId, datasetVersion]);

  const value = useMemo(
    () => ({
      companies,
      companyId,
      setCompanyId,
      monthKey,
      setMonthKey,
      monthKeys,
      dataset,
      isLoading,
      error,
      refetchDataset,
    }),
    [companies, companyId, monthKey, monthKeys, dataset, isLoading, error, refetchDataset],
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }

  return context;
}

export function useDashboardDataset() {
  const { dataset, isLoading, error } = useDashboard();

  if (!dataset) {
    throw new Error(
      isLoading
        ? "Dashboard data is still loading."
        : (error ?? "Dashboard data is unavailable."),
    );
  }

  return dataset;
}
