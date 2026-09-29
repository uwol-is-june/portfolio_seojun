import { cache } from "react";
import { defaultLocale, type Locale } from "./config";

/**
 * 요청마다 하나씩 생기는 언어 저장소 (서버 컴포넌트 전용).
 * 영어 페이지는 맨 처음에 setRequestLocale("en")을 부르고, 그 아래 서버 컴포넌트는 getLocale()로 읽습니다.
 * 한국어 페이지는 따로 부르지 않아도 기본값(ko)이 됩니다.
 */
const store = cache(() => ({ locale: defaultLocale as Locale }));

export function setRequestLocale(locale: Locale) {
  store().locale = locale;
}

export function getLocale(): Locale {
  return store().locale;
}
