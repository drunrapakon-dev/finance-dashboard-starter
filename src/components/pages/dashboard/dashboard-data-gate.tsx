"use client";

import { useDashboard } from "@/context/dashboard-context";

type DashboardDataGateProps = {
  children: React.ReactNode;
  skeleton: React.ReactNode;
};

export function DashboardDataGate({ children, skeleton }: DashboardDataGateProps) {
  const { dataset, isLoading, error } = useDashboard();

  if (!dataset) {
    if (isLoading) {
      return <>{skeleton}</>;
    }

    if (error) {
      return (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      );
    }

    return null;
  }

  return <>{children}</>;
}
