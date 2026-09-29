"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { hasTranslation, localizePath, stripLocale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/locale-provider";

/**
 * 한국어 ↔ 영어 전환. 지금 보고 있는 페이지의 다른 언어 주소로 갑니다 (/about ↔ /en/about).
 * 두 언어는 루트 레이아웃이 달라 페이지를 새로 불러오므로 일반 링크(<a>)를 씁니다.
 * 다른 언어판이 없는 페이지(/design-system 등)에서는 그 언어의 홈으로 갑니다.
 */
export default function LanguageSwitch() {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const other = locale === "ko" ? "en" : "ko";
  const counterpart = locale === "ko" ? localizePath(pathname, "en") : stripLocale(pathname);
  const target = hasTranslation(pathname) ? counterpart : localizePath("/", other);

  // 탭 선택(#company) 같은 해시는 누르는 순간 읽어서 넘깁니다.
  // 탭은 history.replaceState로 해시를 바꿔 hashchange가 나지 않으므로 미리 저장해 두면 놓칩니다.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || !hasTranslation(pathname)) return;
    e.preventDefault();
    window.location.href = target + window.location.hash;
  };

  return (
    <a
      href={target}
      onClick={onClick}
      hrefLang={other}
      lang={other}
      aria-label={t.switchLanguage}
      title={t.switchLanguage}
      className="flex h-9 min-w-9 items-center justify-center rounded-pill px-2 text-caption font-semibold text-muted transition-colors hover:bg-surface-raised hover:text-fg"
    >
      {locale === "ko" ? "EN" : "KO"}
    </a>
  );
}
