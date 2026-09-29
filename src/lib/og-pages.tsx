import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { categoryHex } from "@/lib/category";
import { getPosition, getProfile, getProject, getSite } from "@/lib/content";
import { renderOgImage } from "@/lib/og";

/**
 * 페이지별 공유 미리보기 이미지. 공유 이미지 라우트는 요청 언어 저장소(getLocale)를 쓸 수 없어
 * 한국어 · 영어 라우트가 각자 언어를 넘깁니다 (TASK-117).
 */
export function homeOg(locale: Locale) {
  const profile = getProfile(locale);
  return renderOgImage({ eyebrow: "Portfolio", title: profile.headline, description: `${profile.name} · ${getSite(locale).roles}` });
}

export function aboutOg(locale: Locale) {
  const profile = getProfile(locale);
  const title = profile.name.toUpperCase() === profile.nameEn ? profile.name : `${profile.name} ${profile.nameEn}`;
  return renderOgImage({ eyebrow: "About", title, description: `${profile.headline} · ${getDictionary(locale).aboutOg}` });
}

export function positionOg(id: string, locale: Locale) {
  const position = getPosition(id, locale);
  return renderOgImage({ eyebrow: "Position", title: position?.title ?? "Position", description: position?.tagline });
}

export function projectOg(slug: string, locale: Locale) {
  const project = getProject(slug, locale);
  const eyebrow = getDictionary(locale).projectEyebrow;
  return renderOgImage({
    eyebrow: project ? `${eyebrow} · ${project.subtitle}` : eyebrow,
    title: project?.title ?? "Project",
    description: project?.highlights.slice(0, 2).join(" · "),
    accent: project ? categoryHex[project.category] : undefined,
  });
}
