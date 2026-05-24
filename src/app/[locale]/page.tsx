import { redirect } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/sign-up", locale });
}
