import Home, { generateMetadata as koMetadata } from "@/app/(site)/page";
import { setRequestLocale } from "@/i18n/request";

/** 영어 홈 (/en). 한국어 페이지와 같은 화면을 언어만 바꿔 그립니다. */
export function generateMetadata() {
  setRequestLocale("en");
  return koMetadata();
}

export default function EnglishHome() {
  setRequestLocale("en");
  return <Home />;
}
