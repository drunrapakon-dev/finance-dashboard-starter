"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const localeOptions = [
  { locale: "en", flag: "🇬🇧" },
  { locale: "th", flag: "🇹🇭" },
] as const satisfies ReadonlyArray<{
  locale: (typeof routing.locales)[number];
  flag: string;
}>;

export function ToggleLanguageRound() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const activeLocale =
    localeOptions.find((option) => option.locale === locale) ?? localeOptions[0];

  function handleToggle() {
    const currentIndex = localeOptions.findIndex((option) => option.locale === locale);
    const nextIndex = (currentIndex + 1) % localeOptions.length;
    router.replace(pathname, { locale: localeOptions[nextIndex].locale });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={t("toggleLabel")}
      title={t("toggleLabel")}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
    >
      <span aria-hidden>{activeLocale.flag}</span>
    </button>
  );
}
