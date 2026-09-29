import AboutPage, { generateMetadata as koMetadata } from "@/app/(site)/about/page";
import { setRequestLocale } from "@/i18n/request";

export function generateMetadata() {
  setRequestLocale("en");
  return koMetadata();
}

export default function EnglishAboutPage() {
  setRequestLocale("en");
  return <AboutPage />;
}
