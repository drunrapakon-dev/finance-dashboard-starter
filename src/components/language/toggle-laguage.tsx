"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const localeOptions = [
  { locale: "en", flag: "🇬🇧", labelKey: "english" },
  { locale: "th", flag: "🇹🇭", labelKey: "thai" },
] as const satisfies ReadonlyArray<{
  locale: (typeof routing.locales)[number];
  flag: string;
  labelKey: "english" | "thai";
}>;

type ToggleLanguageProps = {
  className?: string;
};

export function ToggleLanguage({ className = "" }: ToggleLanguageProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLocale =
    localeOptions.find((option) => option.locale === locale) ?? localeOptions[0];

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

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function handleSelect(nextLocale: (typeof routing.locales)[number]) {
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      >
        <span className="text-lg leading-none" aria-hidden>
          {activeLocale.flag}
        </span>
        <span className="flex-1 text-left">{t(activeLocale.labelKey)}</span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={t("label")}
          className="absolute bottom-full left-0 mb-2 min-w-[10.5rem] overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          {localeOptions.map((option) => {
            const isActive = option.locale === locale;

            return (
              <button
                key={option.locale}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(option.locale)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {option.flag}
                </span>
                <span className="flex-1 font-medium">{t(option.labelKey)}</span>
                {isActive ? (
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 01.006 1.413l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
