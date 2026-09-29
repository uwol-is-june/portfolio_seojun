import type { Metadata } from "next";
import { localeMeta, localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/request";
import { getSite } from "@/lib/content";

/** 한 페이지의 언어별 주소 (hreflang). path는 한국어 기준 주소입니다. */
export function languageAlternates(path: string) {
  return { ko: path, en: localizePath(path, "en"), "x-default": path };
}

/**
 * 페이지별 메타데이터 (TASK-20 · TASK-117)
 * openGraph는 레이아웃과 페이지 사이에서 통째로 덮어써지므로, 페이지마다 이 함수로 한 번에 만듭니다.
 * og:image는 각 라우트의 opengraph-image.tsx가 자동으로 붙입니다. path는 한국어 기준 주소를 넘기면
 * 요청 언어에 맞게 /en을 붙이고, 언어별 대체 주소(hreflang)도 함께 적습니다.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** 레이아웃 템플릿("%s | SEOJUN")이 뒤에 사이트 이름을 붙입니다. */
  title: string;
  description: string;
  path: string;
}): Metadata {
  const locale = getLocale();
  const site = getSite();
  const url = localizePath(path, locale);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
    },
  };
}
