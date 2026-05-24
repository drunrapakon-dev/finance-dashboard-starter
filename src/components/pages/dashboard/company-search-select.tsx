"use client";

import { mockCompanies } from "@/lib/mock/companies";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

type CompanySearchSelectProps = {
  value: string;
  onChange: (companyId: string) => void;
};

export function CompanySearchSelect({ value, onChange }: CompanySearchSelectProps) {
  const t = useTranslations("DashboardToolbar");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCompany =
    mockCompanies.find((company) => company.id === value) ?? mockCompanies[0];

  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return mockCompanies;
    }

    return mockCompanies.filter((company) =>
      company.name.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {t("company")}
        </span>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 min-w-[13rem] items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        >
          <span className="truncate">{selectedCompany.name}</span>
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-zinc-500">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchCompany")}
            className="mb-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <ul className="max-h-56 overflow-y-auto">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <li key={company.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(company.id);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      company.id === value
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {company.name}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                {t("noCompanyFound")}
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
