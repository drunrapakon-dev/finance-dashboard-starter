import { SignUpPageContent } from "@/components/pages/sign-up/sign-up-page-content";
import { setRequestLocale } from "next-intl/server";

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SignUpPageContent />;
}
