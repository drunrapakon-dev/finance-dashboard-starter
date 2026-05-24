"use client";

import {
  getCompanyDataset,
  mockCompanies,
  monthKeys,
  type MonthKey,
} from "@/lib/mock/companies";
import { createContext, useContext, useMemo, useState } from "react";

type DashboardContextValue = {
  companies: typeof mockCompanies;
  companyId: string;
  setCompanyId: (companyId: string) => void;
  monthKey: MonthKey;
  setMonthKey: (monthKey: MonthKey) => void;
  monthKeys: readonly MonthKey[];
  dataset: ReturnType<typeof getCompanyDataset>;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [companyId, setCompanyId] = useState(mockCompanies[0].id);
  const [monthKey, setMonthKey] = useState<MonthKey>(monthKeys[monthKeys.length - 1]);

  const dataset = useMemo(() => getCompanyDataset(companyId), [companyId]);

  const value = useMemo(
    () => ({
      companies: mockCompanies,
      companyId,
      setCompanyId,
      monthKey,
      setMonthKey,
      monthKeys,
      dataset,
    }),
    [companyId, dataset, monthKey],
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
