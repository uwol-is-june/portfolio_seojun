import type { Metadata, Viewport } from "next";
import ScrollToTop from "@/components/layout/scroll-to-top";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import MotionProvider from "@/components/motion/motion-provider";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s | ${site.name}`,
  },
  description: `${profile.headline} ${profile.name}의 포트폴리오 · ${site.roles}`,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: `${profile.name} — ${profile.headline}`,
    description: `${profile.headline} ${profile.name}의 포트폴리오 · ${site.roles}`,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${fontVariables} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <ScrollToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
