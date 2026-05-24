import { ReportsPageContent } from "@/components/pages/reports/reports-page-content";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ReportsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ReportsPageContent />;
}
