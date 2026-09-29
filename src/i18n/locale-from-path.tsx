"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Locale } from "./config";
import { LocaleProvider, useLocale } from "./locale-provider";

const fromPath = (): Locale => {
  const { pathname } = window.location;
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
};
const noop = () => () => {};

/**
 * 주소로 언어를 정합니다 (전역 404 전용). 없는 주소의 404는 어느 언어 레이아웃에도 속하지 않아
 * 서버에서 언어를 알 수 없으므로, 브라우저에서 /en으로 시작하면 영어로 바꿉니다.
 */
export default function LocaleFromPath({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(noop, fromPath, () => "ko" as Locale);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}

/** 두 언어 버전을 미리 그려 두고 현재 언어 쪽만 보여줍니다 (서버 컴포넌트인 푸터를 전역 404에서 쓸 때) */
export function ByLocale({ ko, en }: { ko: React.ReactNode; en: React.ReactNode }) {
  return <>{useLocale() === "en" ? en : ko}</>;
}
