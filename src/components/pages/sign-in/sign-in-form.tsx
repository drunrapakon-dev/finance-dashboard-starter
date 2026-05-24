"use client";

import { useRouter } from "@/i18n/navigation";
import {
  MOCK_EMAIL,
  MOCK_PASSWORD,
} from "@/lib/auth/mock-credentials";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

export function SignInForm() {
  const t = useTranslations("SignInForm");
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setError("");
      router.push("/dashboard");
      return;
    }

    setError(t("invalidCredentials"));
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={MOCK_EMAIL}
          className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          defaultValue={MOCK_PASSWORD}
          className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-500"
      >
        {t("submit")}
      </button>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        {t("demoHint")}
      </p>
    </form>
  );
}
