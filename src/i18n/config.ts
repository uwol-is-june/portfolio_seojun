/**
 * 언어 설정 (TASK-117)
 * 한국어는 지금 주소 그대로(/about), 영어는 /en 아래(/en/about)에 둡니다.
 * 공개 데모(/demo/*)와 파일(PDF 등)은 언어 구분 없이 한 주소를 씁니다.
 */
export type Locale = "ko" | "en";

export const locales: readonly Locale[] = ["ko", "en"];
export const defaultLocale: Locale = "ko";

/** Open Graph · <html lang>에 쓰는 표기 */
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  ko: { htmlLang: "ko", ogLocale: "ko_KR", label: "한국어" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "English" },
};

const UNLOCALIZED = [/^\/demo(\/|$)/, /^\/api\//, /\.[a-z0-9]+$/i];

/** 내부 경로에 언어 접두사를 붙입니다. 외부 주소 · 해시 · 데모 · 파일은 그대로 둡니다. */
export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === "/en" || path.startsWith("/en/") || path.startsWith("/en#")) return path;
  const pathname = path.split(/[?#]/)[0];
  if (UNLOCALIZED.some((re) => re.test(pathname))) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** 현재 주소에서 언어 접두사를 떼어 한국어 주소로 만듭니다 (언어 전환 버튼) */
export function stripLocale(path: string): string {
  if (path === "/en") return "/";
  return path.startsWith("/en/") ? path.slice(3) : path;
}

/** 한국어 · 영어 두 판이 모두 있는 주소인가 (홈 · 포지션 · About · 프로젝트 상세) */
const TRANSLATED = /^(\/en)?(\/(product-manager|service-planner|ai-product-builder|about|projects\/[a-z0-9-]+))?\/?$/;

export function hasTranslation(path: string): boolean {
  return TRANSLATED.test(path.split(/[?#]/)[0]);
}
