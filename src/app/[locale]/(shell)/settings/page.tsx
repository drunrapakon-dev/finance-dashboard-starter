import { SettingsPageContent } from "@/components/pages/settings/settings-page-content";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SettingsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SettingsPageContent />;
}
