import { TransactionsPageContent } from "@/components/pages/transactions/transactions-page-content";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function TransactionsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TransactionsPageContent />;
}
