import type { Metadata, Viewport } from "next";
import ScrollToTop from "@/components/layout/scroll-to-top";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import MotionProvider from "@/components/motion/motion-provider";
import { fontVariables } from "@/app/(site)/fonts";
import { localeMeta, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getDictionary } from "@/i18n/ui";
import { getProfile, getSite } from "@/lib/content";
import { THEME_SCRIPT } from "@/lib/theme";

/** 사이트 공통 메타데이터. 한국어 레이아웃((site))과 영어 레이아웃((site-en))이 같이 씁니다. */
export function siteMetadata(locale: Locale): Metadata {
  const site = getSite(locale);
  const profile = getProfile(locale);
  const t = getDictionary(locale);
  const title = `${profile.name} — ${profile.headline}`;
  const description = `${profile.headline} · ${t.portfolioOf(profile.name)} · ${site.roles}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    // canonical · hreflang · og:url은 페이지마다 다르므로 여기 두지 않습니다 (홈은 page.tsx, 나머지는 pageMetadata).
    // 레이아웃에 두면 따로 정하지 않은 페이지(디자인 시스템 · 404 등)가 홈의 중복 페이지로 표시됩니다.
    openGraph: { type: "website", locale: localeMeta[locale].ogLocale, siteName: site.name, title, description },
    twitter: { card: "summary_large_image" },
  };
}

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/** <html>부터 헤더 · 푸터까지 사이트 공통 틀 */
export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    // data-theme은 THEME_SCRIPT가 하이드레이션 전에 적으므로 이 엘리먼트만 불일치 경고를 끕니다.
    <html lang={localeMeta[locale].htmlLang} className={`${fontVariables} h-full`} suppressHydrationWarning>
      {/* 루트 레이아웃(site-shell)의 <head>라 next/head가 아니라 그대로 씁니다. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>
          <MotionProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter locale={locale} />
            <ScrollToTop />
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
