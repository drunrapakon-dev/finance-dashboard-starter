import { AnalyticsPageContent } from "@/components/pages/analytics/analytics-page-content";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AnalyticsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AnalyticsPageContent />;
}
