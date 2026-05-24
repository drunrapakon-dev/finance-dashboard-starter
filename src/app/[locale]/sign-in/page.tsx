import { SignInPageContent } from "@/components/pages/sign-in/sign-in-page-content";
import { setRequestLocale } from "next-intl/server";

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SignInPageContent />;
}
