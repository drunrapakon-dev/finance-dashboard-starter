"use client";

import { Card } from "@/components/custom/card/card";
import { Toggle } from "@/components/custom/toggle/toggle";
import { ShellPageLayout } from "@/components/layout/shell-page-layout";
import { useTheme } from "@/components/theme/theme-provider";
import { useSettings } from "@/context/settings-context";
import { usePathname, useRouter } from "@/i18n/navigation";
import { currencyOptions, formatCurrency } from "@/lib/format/currency";
import { useLocale, useTranslations } from "next-intl";

const localeOptions = [
  { locale: "en", labelKey: "english", flag: "🇬🇧" },
  { locale: "th", labelKey: "thai", flag: "🇹🇭" },
] as const;

const previewAmount = 128_450.75;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function SettingsPageContent() {
  const t = useTranslations("SettingsPage");
  const tLocale = useTranslations("LocaleSwitcher");
  const tSettings = useTranslations("SidebarSettings");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { profile, currency, notifications, setProfile, setCurrency, setNotification } =
    useSettings();

  const formattedPreview = formatCurrency(previewAmount, locale, currency);

  function handleSignOut() {
    router.push("/sign-in");
  }

  return (
    <ShellPageLayout title={t("title")} description={t("description")}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <Card title={t("profileTitle")} description={t("profileDescription")}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
              aria-hidden
            >
              {getInitials(profile.fullName) || "?"}
            </div>

            <div className="grid flex-1 gap-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("fullName")}
                </span>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(event) => setProfile({ fullName: event.target.value })}
                  className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500/20 focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("email")}
                </span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => setProfile({ email: event.target.value })}
                  className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500/20 focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("companyName")}
                </span>
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(event) => setProfile({ companyName: event.target.value })}
                  className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500/20 focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
            </div>
          </div>
        </Card>

        <Card title={t("currencyTitle")} description={t("currencyDescription")}>
          <div className="flex flex-wrap gap-2">
            {currencyOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setCurrency(option.code)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  currency === option.code
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {t(`currencies.${option.labelKey}`)}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800/50">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {t("formatPreview")}
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {formattedPreview}
            </p>
          </div>
        </Card>

        <Card
          title={t("notificationsTitle")}
          description={t("notificationsDescription")}
        >
          <div className="space-y-4">
            <Toggle
              checked={notifications.monthlySummary}
              onChange={(enabled) => setNotification("monthlySummary", enabled)}
              label={t("notifications.monthlySummary")}
              description={t("notifications.monthlySummaryHint")}
            />
            <Toggle
              checked={notifications.weeklyReports}
              onChange={(enabled) => setNotification("weeklyReports", enabled)}
              label={t("notifications.weeklyReports")}
              description={t("notifications.weeklyReportsHint")}
            />
            <Toggle
              checked={notifications.expenseAlerts}
              onChange={(enabled) => setNotification("expenseAlerts", enabled)}
              label={t("notifications.expenseAlerts")}
              description={t("notifications.expenseAlertsHint")}
            />
          </div>
        </Card>

        <Card title={t("appearanceTitle")} description={t("appearanceDescription")}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {localeOptions.map((option) => (
                <button
                  key={option.locale}
                  type="button"
                  onClick={() => router.replace(pathname, { locale: option.locale })}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    locale === option.locale
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>{option.flag}</span>
                  {tLocale(option.labelKey)}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
            >
              <span className="text-base">{theme === "dark" ? "☀" : "☾"}</span>
              {theme === "dark" ? t("themeLight") : t("themeDark")}
            </button>
          </div>
        </Card>

        <Card title={t("accountTitle")} description={t("accountDescription")}>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            {tSettings("signOut")}
          </button>
        </Card>
      </div>
    </ShellPageLayout>
  );
}
