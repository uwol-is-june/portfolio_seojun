import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Universal Sans는 xAI 독점 폰트 → Inter(가변)로 대체(디스플레이+본문).
// Geist Mono는 문서가 명시한 브랜드 동반 폰트 — 대문자 eyebrow/label 전용.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 포트폴리오와 디자인 토큰이 달라 루트 레이아웃을 따로 둔다 (src/app/(site)/layout.tsx 와 별개).
export const metadata: Metadata = {
  title: "서학개미클럽 데모 | SEO JUN",
  description: "4대 거장 투자 전략 기반 미국장 리서치 대시보드 공개 데모. 보유 종목은 목 데이터, 보고서는 원본 스냅샷입니다.",
  robots: { index: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 한컴(data-hwp-extension) 등 브라우저 확장이 <html>에 속성을 주입해 하이드레이션
    // 불일치가 뜬다. suppressHydrationWarning은 이 엘리먼트에만 적용된다.
    <html
      lang="ko"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-canvas text-body">
        {children}
        {/* 공개 데모 표시 (lib/demo.ts) */}
        <div
          role="note"
          className="fixed right-4 bottom-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white/80 shadow-lg backdrop-blur"
        >
          <span className="font-semibold text-white">공개 데모</span>
          <span>보유 종목은 목 데이터 · 보고서는 원본 스냅샷</span>
          <Link href="/projects/seohak-gaemi-club" className="shrink-0 text-white underline underline-offset-2">
            포트폴리오로
          </Link>
        </div>
      </body>
    </html>
  );
}
