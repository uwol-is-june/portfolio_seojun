"use client";

import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "./config";
import { getDictionary } from "./ui";

const LocaleContext = createContext<Locale>(defaultLocale);

/** 클라이언트 컴포넌트에 현재 언어를 알려 줍니다 (레이아웃에서 한 번 감쌈) */
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** 클라이언트 컴포넌트에서 현재 언어의 UI 문구 */
export function useT() {
  return getDictionary(useContext(LocaleContext));
}
