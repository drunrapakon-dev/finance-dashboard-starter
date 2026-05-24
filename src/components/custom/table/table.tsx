"use client";

import { getPageNumbers } from "@/lib/table/pagination";
import { useEffect, useMemo, useState } from "react";

export type TableColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export type TableFilter<T> = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  match: (row: T, value: string) => boolean;
};

type DateRangeFilter<T> = {
  getDate: (row: T) => string;
  fromLabel: string;
  toLabel: string;
  min?: string;
  max?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey?: (row: T, index: number) => string;
  searchPlaceholder: string;
  searchMatch: (row: T, query: string) => boolean;
  filters?: TableFilter<T>[];
  dateRangeFilter?: DateRangeFilter<T>;
  pageSize?: number;
  emptyMessage: string;
  previousLabel: string;
  nextLabel: string;
  pageLabel: (current: number, total: number) => string;
};

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  searchPlaceholder,
  searchMatch,
  filters = [],
  dateRangeFilter,
  pageSize = 8,
  emptyMessage,
  previousLabel,
  nextLabel,
  pageLabel,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((filter) => [filter.id, "all"])),
  );
  const [dateFrom, setDateFrom] = useState(dateRangeFilter?.min ?? "");
  const [dateTo, setDateTo] = useState(dateRangeFilter?.max ?? "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (dateRangeFilter?.min) {
      setDateFrom(dateRangeFilter.min);
    }
    if (dateRangeFilter?.max) {
      setDateTo(dateRangeFilter.max);
    }
  }, [dateRangeFilter?.max, dateRangeFilter?.min]);

  const filteredData = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return data.filter((row) => {
      const matchesSearch =
        normalizedQuery.length === 0 || searchMatch(row, normalizedQuery);

      const matchesFilters = filters.every((filter) => {
        const selectedValue = filterValues[filter.id] ?? "all";
        return selectedValue === "all" || filter.match(row, selectedValue);
      });

      const rowDate = dateRangeFilter ? dateRangeFilter.getDate(row) : null;
      const matchesDateRange =
        !dateRangeFilter ||
        ((!dateFrom || rowDate! >= dateFrom) && (!dateTo || rowDate! <= dateTo));

      return matchesSearch && matchesFilters && matchesDateRange;
    });
  }, [data, dateFrom, dateRangeFilter, dateTo, filterValues, filters, searchMatch, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, filteredData, pageSize]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  function handleFilterChange(filterId: string, value: string) {
    setFilterValues((current) => ({ ...current, [filterId]: value }));
    setPage(1);
  }

  function handleDateChange(type: "from" | "to", value: string) {
    if (type === "from") {
      setDateFrom(value);
    } else {
      setDateTo(value);
    }
    setPage(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-sm">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        {(filters.length > 0 || dateRangeFilter) ? (
          <div className="flex flex-wrap items-end justify-end gap-3 lg:ml-auto">
            {dateRangeFilter ? (
              <>
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">
                    {dateRangeFilter.fromLabel}
                  </span>
                  <input
                    type="date"
                    value={dateFrom}
                    min={dateRangeFilter.min}
                    max={dateTo || dateRangeFilter.max}
                    onChange={(event) => handleDateChange("from", event.target.value)}
                    className="h-10 min-w-[9rem] rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">
                    {dateRangeFilter.toLabel}
                  </span>
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom || dateRangeFilter.min}
                    max={dateRangeFilter.max}
                    onChange={(event) => handleDateChange("to", event.target.value)}
                    className="h-10 min-w-[9rem] rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                  />
                </label>
              </>
            ) : null}

            {filters.map((filter) => (
              <label key={filter.id} className="flex flex-col gap-1 text-xs">
                <span className="font-medium text-zinc-500 dark:text-zinc-400">
                  {filter.label}
                </span>
                <select
                  value={filterValues[filter.id] ?? "all"}
                  onChange={(event) =>
                    handleFilterChange(filter.id, event.target.value)
                  }
                  className="h-10 min-w-[9rem] rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/60">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={getRowKey ? getRowKey(row, index) : index}
                  className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200 ${column.className ?? ""}`}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {pageLabel(currentPage, totalPages)}
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {previousLabel}
          </button>
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-zinc-400 dark:text-zinc-500"
              >
                …
              </span>
            ) : (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`min-w-9 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  currentPage === pageNumber
                    ? "bg-emerald-600 text-white"
                    : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
