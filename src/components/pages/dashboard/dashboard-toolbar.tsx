"use client";

import { CompanySearchSelect } from "@/components/pages/dashboard/company-search-select";
import { useDashboard } from "@/context/dashboard-context";

export function DashboardToolbar() {
  const { companyId, setCompanyId } = useDashboard();

  return (
    <div className="flex flex-wrap items-end justify-end gap-3">
      <CompanySearchSelect value={companyId} onChange={setCompanyId} />
    </div>
  );
}
