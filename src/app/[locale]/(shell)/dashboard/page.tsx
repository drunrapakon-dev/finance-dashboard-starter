import { DashboardPageContent } from "@/components/pages/dashboard/dashboard-page-content";
import { setRequestLocale } from "next-intl/server";

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardPageContent />;
}
