import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * 페이지별 메타데이터 (TASK-20)
 * openGraph는 레이아웃과 페이지 사이에서 통째로 덮어써지므로, 페이지마다 이 함수로 한 번에 만듭니다.
 * og:image는 각 라우트의 opengraph-image.tsx가 자동으로 붙입니다.
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
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
    },
  };
}
