import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

// 원본은 시스템에 설치된 Pretendard를 기대했다. 데모는 포트폴리오와 같은 가변 폰트 파일을 쓴다.
const pretendard = localFont({
  src: "../../../../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: false,
});

// 원본과 디자인이 달라 루트 레이아웃을 따로 둔다 (src/app/(site)/layout.tsx 와 별개).
export const metadata: Metadata = {
  title: "위촉 사전 진단 시뮬레이터 데모 | SEO JUN",
  description: "FA 위촉 사전 진단 시뮬레이터의 공개 데모. 화면과 흐름은 원본 그대로, 사내 기준 문구는 대외비로 가렸습니다.",
  robots: { index: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 한컴(data-hwp-extension) 등 브라우저 확장이 <html>에 속성을 주입해 하이드레이션
    // 불일치가 뜬다. suppressHydrationWarning은 이 엘리먼트에만 적용된다.
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        {children}
        {/* 공개 데모 표시 */}
        <div
          role="note"
          className="fixed right-4 bottom-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white/80 shadow-lg backdrop-blur print:hidden"
        >
          <span className="shrink-0 font-semibold text-white">공개 데모</span>
          <span>사내 기준은 대외비 처리 · 대상자는 가상 데이터</span>
          <Link href="/projects/fa-recruit-simulator" className="shrink-0 text-white underline underline-offset-2">
            포트폴리오로
          </Link>
        </div>
      </body>
    </html>
  );
}
