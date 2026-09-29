import ProjectPage, { generateMetadata as koMetadata, generateStaticParams } from "@/app/(site)/projects/[slug]/page";
import { setRequestLocale } from "@/i18n/request";

export { generateStaticParams };
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateMetadata(props: Props) {
  setRequestLocale("en");
  return koMetadata(props as PageProps<"/projects/[slug]">);
}

export default function EnglishProjectPage(props: Props) {
  setRequestLocale("en");
  return ProjectPage(props as PageProps<"/projects/[slug]">);
}
