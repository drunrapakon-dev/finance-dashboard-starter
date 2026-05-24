"use client";

import { ToggleLanguage } from "@/components/language/toggle-laguage";
import { SignInForm } from "@/components/pages/sign-in/sign-in-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function SignInPageContent() {
  const t = useTranslations("SignInPage");

  return (
    <div className="relative flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">
              {t("brand")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {t("description")}
            </p>
          </div>

          <SignInForm />

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {t("noAccount")}{" "}
            <Link href="/sign-up" className="font-medium text-emerald-600 hover:text-emerald-500">
              {t("signUpLink")}
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-6">
        <ToggleLanguage />
      </div>
    </div>
  );
}
