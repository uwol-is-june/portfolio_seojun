import SiteShell, { siteMetadata, siteViewport } from "@/components/layout/site-shell";
import "../(site)/globals.css";

/** 영어 페이지(/en/...)의 루트 레이아웃. 화면은 한국어 페이지와 같고 언어만 다릅니다 (TASK-117). */
export const metadata = siteMetadata("en");
export const viewport = siteViewport;

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
