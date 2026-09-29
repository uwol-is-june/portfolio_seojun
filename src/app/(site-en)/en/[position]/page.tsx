import PositionPage, { generateMetadata as koMetadata, generateStaticParams } from "@/app/(site)/[position]/page";
import { setRequestLocale } from "@/i18n/request";

export { generateStaticParams };
export const dynamicParams = false;

type Props = { params: Promise<{ position: string }> };

export function generateMetadata(props: Props) {
  setRequestLocale("en");
  return koMetadata(props as PageProps<"/[position]">);
}

export default function EnglishPositionPage(props: Props) {
  setRequestLocale("en");
  return PositionPage(props as PageProps<"/[position]">);
}
