"use client";

import { useSettings } from "@/context/settings-context";
import { formatCurrency } from "@/lib/format/currency";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export function useFormatCurrency() {
  const locale = useLocale();
  const { currency } = useSettings();

  return useCallback(
    (amount: number) => formatCurrency(amount, locale, currency),
    [currency, locale],
  );
}
