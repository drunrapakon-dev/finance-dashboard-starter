import { CategoriesPageContent } from "@/components/pages/categories/categories-page-content";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CategoriesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CategoriesPageContent />;
}
