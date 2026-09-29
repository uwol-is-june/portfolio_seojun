import type { Metadata } from "next";
import ScrollToTop from "@/components/layout/scroll-to-top";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import MotionProvider from "@/components/motion/motion-provider";
import { site } from "@/content/site";
import LocaleFromPath, { ByLocale } from "@/i18n/locale-from-path";
import { THEME_SCRIPT } from "@/lib/theme";
import { fontVariables } from "./(site)/fonts";
import NotFound from "./(site)/not-found";
import "./(site)/globals.css";

// 루트 레이아웃이 사이트 · 서학개미클럽 데모 둘로 나뉘어 있어서, 없는 주소의 404는 여기서 그립니다.
export const metadata: Metadata = {
  title: `페이지를 찾을 수 없습니다 | ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="ko" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleFromPath>
        <MotionProvider>
          <SiteHeader />
          <div className="flex-1">
            <NotFound />
          </div>
          <ByLocale ko={<SiteFooter locale="ko" />} en={<SiteFooter locale="en" />} />
          <ScrollToTop />
        </MotionProvider>
        </LocaleFromPath>
      </body>
    </html>
  );
}
