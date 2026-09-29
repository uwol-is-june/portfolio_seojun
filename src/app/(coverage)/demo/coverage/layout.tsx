import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

// 원본(incar_ca_test)과 디자인이 달라 루트 레이아웃을 따로 둔다 (src/app/(site)/layout.tsx 와 별개).
export const metadata: Metadata = {
  title: "보장분석 데모 | SEO JUN",
  description: "내보험다보여 연동 보장분석 서비스의 공개 데모. 화면과 흐름은 원본 그대로, 보험 데이터는 가상 목업입니다.",
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
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
        {/* 공개 데모 표시 (lib/mock-api.ts) */}
        <div
          role="note"
          className="no-print fixed right-4 bottom-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs text-white/80 shadow-lg backdrop-blur"
        >
          <span className="shrink-0 font-semibold text-white">공개 데모</span>
          <span>가상 보험 데이터 · 입력값은 전송되지 않음</span>
          <Link href="/projects/coverage-analysis" className="shrink-0 text-white underline underline-offset-2">
            포트폴리오로
          </Link>
        </div>
      </body>
    </html>
  );
}
