import { builds as buildsKo } from "@/content/builds";
import { builds as buildsEn } from "@/content/en/builds";
import { positions as positionsEn } from "@/content/en/positions";
import { profile as profileEn } from "@/content/en/profile";
import { projects as projectsEn } from "@/content/en/projects";
import * as showcasesEn from "@/content/en/showcases";
import { site as siteEn } from "@/content/en/site";
import { positions as positionsKo } from "@/content/positions";
import { profile as profileKo } from "@/content/profile";
import { projects as projectsKo } from "@/content/projects";
import * as showcasesKo from "@/content/showcases";
import { site as siteKo } from "@/content/site";
import type { PositionId } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/request";

/**
 * 콘텐츠 읽기 (서버 컴포넌트 전용)
 * 언어를 넘기지 않으면 요청 언어(getLocale)를 씁니다. 영어는 src/content/en.
 */
const content = {
  ko: { positions: positionsKo, projects: projectsKo, builds: buildsKo, profile: profileKo, site: siteKo, showcases: showcasesKo },
  en: { positions: positionsEn, projects: projectsEn, builds: buildsEn, profile: profileEn, site: siteEn, showcases: showcasesEn },
} satisfies Record<Locale, unknown>;

const pick = (locale?: Locale) => content[locale ?? getLocale()];

export function getPositions(locale?: Locale) {
  return pick(locale).positions;
}

export function getPosition(id: string, locale?: Locale) {
  return pick(locale).positions.find((p) => p.id === id);
}

export function getProjects(locale?: Locale) {
  return pick(locale).projects;
}

export function getProject(slug: string, locale?: Locale) {
  return pick(locale).projects.find((p) => p.slug === slug);
}

export function getProfile(locale?: Locale) {
  return pick(locale).profile;
}

export function getSite(locale?: Locale) {
  return pick(locale).site;
}

export function getShowcases(locale?: Locale) {
  return pick(locale).showcases;
}

/** 해당 포지션의 프로젝트. 대표 포지션이 일치하고 featured인 것부터 보여줍니다. */
export function getProjectsByPosition(id: PositionId, locale?: Locale) {
  const projects = pick(locale).projects;
  const rank = (p: (typeof projects)[number]) => (p.positions[0] === id ? 0 : 2) + (p.featured ? 0 : 1);
  return projects
    .filter((p) => p.positions.includes(id))
    .map((p, i) => ({ p, i }))
    .sort((a, b) => rank(a.p) - rank(b.p) || a.i - b.i)
    .map(({ p }) => p);
}

/** 해당 포지션 페이지에 보여줄 작은 결과물 */
export function getBuildsByPosition(id: PositionId, locale?: Locale) {
  return pick(locale).builds.filter((b) => b.positions.includes(id));
}
