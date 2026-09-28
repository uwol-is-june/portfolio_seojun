import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import MotionProvider from "@/components/motion/motion-provider";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 한글용. Inter가 없는 글자(한글)만 Pretendard로 표시됩니다.
// 가변 폰트 한 파일(약 2MB)이라 preload는 끄고 필요할 때 받습니다.
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${inter.variable} ${pretendard.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
