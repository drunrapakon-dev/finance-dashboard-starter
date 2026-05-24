"use client";

import {
  availableYears,
  isMonthKeyAvailable,
  type MonthKey,
  toMonthKey,
} from "@/lib/mock/companies";
import { useFormatter } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

const monthIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

type MonthPickerProps = {
  value: MonthKey;
  onChange: (monthKey: MonthKey) => void;
};

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const format = useFormatter();
  const [open, setOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedYear, selectedMonthIndex] = useMemo(() => {
    const [year, month] = value.split("-").map(Number);
    return [year, month - 1];
  }, [value]);

  const [viewYear, setViewYear] = useState(selectedYear);

  useEffect(() => {
    setViewYear(selectedYear);
  }, [selectedYear]);

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
        setYearOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const displayValue = format.dateTime(new Date(value + "-01"), {
    month: "short",
    year: "numeric",
  });

  function handleSelectMonth(monthIndex: number) {
    const nextKey = toMonthKey(viewYear, monthIndex);
    if (!nextKey) {
      return;
    }

    onChange(nextKey);
    setOpen(false);
    setYearOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 min-w-[10.5rem] items-center justify-between gap-2 rounded-lg border bg-white px-3 text-sm font-medium text-sky-900 transition dark:bg-zinc-900 dark:text-sky-100 ${
          open
            ? "border-sky-500 ring-2 ring-sky-500/20"
            : "border-sky-200 hover:border-sky-300 dark:border-sky-800 dark:hover:border-sky-700"
        }`}
      >
        <span>{displayValue}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-4 w-4 shrink-0 text-zinc-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M4.5 8.25h15m-16.5 0V19.5A2.25 2.25 0 006.75 21.75h10.5A2.25 2.25 0 0019.5 19.5V8.25m-15 0h15"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
          <div className="relative mb-4 flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => setYearOpen((current) => !current)}
              className="flex items-center gap-1 text-sm font-semibold text-sky-950 dark:text-sky-100"
            >
              {format.dateTime(new Date(`${viewYear}-01-01`), { year: "numeric" })}
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-zinc-400">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {yearOpen ? (
              <div className="absolute top-full z-10 mt-1 w-24 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      setViewYear(year);
                      setYearOpen(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-sm ${
                      viewYear === year
                        ? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                        : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {monthIndices.map((monthIndex) => {
              const monthKeyForCell = toMonthKey(viewYear, monthIndex);
              const isAvailable = isMonthKeyAvailable(viewYear, monthIndex);
              const isSelected =
                isAvailable && monthKeyForCell === value && viewYear === selectedYear;

              const shortLabel = format.dateTime(new Date(viewYear, monthIndex, 1), {
                month: "short",
              });

              return (
                <button
                  key={monthIndex}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => handleSelectMonth(monthIndex)}
                  className={`rounded-full px-2 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "bg-sky-600 text-white"
                      : isAvailable
                        ? "text-sky-950 hover:bg-sky-50 dark:text-sky-100 dark:hover:bg-sky-950/40"
                        : "cursor-not-allowed text-zinc-300 dark:text-zinc-600"
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
