import type { CurrencyCode } from "@/context/settings-context";

export function formatCurrency(
  amount: number,
  locale: string,
  currency: CurrencyCode = "USD",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  }).format(value / 100);
}

export const currencyOptions: Array<{
  code: CurrencyCode;
  labelKey: "usd" | "thb" | "eur" | "gbp";
}> = [
  { code: "USD", labelKey: "usd" },
  { code: "THB", labelKey: "thb" },
  { code: "EUR", labelKey: "eur" },
  { code: "GBP", labelKey: "gbp" },
];
