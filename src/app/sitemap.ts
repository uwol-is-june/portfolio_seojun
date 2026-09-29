import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { localizePath } from "@/i18n/config";
import { getPositions, getProjects } from "@/lib/content";
import { languageAlternates } from "@/lib/metadata";

// /design-system은 내부용이라 넣지 않습니다. 한국어 · 영어 주소를 모두 넣고 서로를 대체 주소로 잇습니다.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    ...getPositions("ko").map((p) => ({ path: `/${p.id}`, priority: 0.9 })),
    ...getProjects("ko").map((p) => ({ path: `/projects/${p.slug}`, priority: 0.7 })),
    { path: "/about", priority: 0.8 },
  ];
  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, url(v)]));
    return (["ko", "en"] as const).map((locale) => ({
      url: url(localizePath(path, locale)),
      changeFrequency: "monthly" as const,
      priority: locale === "ko" ? priority : Math.round(priority * 90) / 100,
      alternates: { languages },
    }));
  });
}
