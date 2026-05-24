"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const localeOptions = [
  { locale: "en", flag: "🇬🇧" },
  { locale: "th", flag: "🇹🇭" },
] as const;

export function SidebarSettingsMenu() {
  const t = useTranslations("SidebarSettings");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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

  function handleToggleLanguage() {
    const currentIndex = localeOptions.findIndex((option) => option.locale === locale);
    const nextIndex = (currentIndex + 1) % localeOptions.length;
    router.replace(pathname, { locale: localeOptions[nextIndex].locale });
  }

  function handleSignOut() {
    setOpen(false);
    router.push("/sign-in");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={t("openMenu")}
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 6a.75.75 0 110-1.5.75.75 0 010 1.5zm0 6a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => {
              handleToggleLanguage();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span className="text-lg">{activeLocale.flag}</span>
            <span>{t("changeLanguage")}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs dark:bg-zinc-800">
              {theme === "dark" ? "☀" : "☾"}
            </span>
            <span>{t("changeTheme")}</span>
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-xs dark:bg-red-950/40">
              ⎋
            </span>
            <span>{t("signOut")}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
