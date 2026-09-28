import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 한글용. Inter가 없는 글자(한글)만 Pretendard로 표시됩니다.
// 가변 폰트 한 파일(약 2MB)이라 preload는 끄고 필요할 때 받습니다.
const pretendard = localFont({
  src: "../../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** <html>에 붙이는 폰트 변수 클래스 (사이트 레이아웃 · 전역 404 공용) */
export const fontVariables = `${inter.variable} ${pretendard.variable} ${geistMono.variable}`;
