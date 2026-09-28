import { positions } from "@/content/positions";
import { projects } from "@/content/projects";
import type { PositionId } from "@/content/types";

export function getPositions() {
  return positions;
}

export function getPosition(id: string) {
  return positions.find((p) => p.id === id);
}

export function getProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** 해당 포지션의 프로젝트. 대표 포지션이 일치하고 featured인 것부터 보여줍니다. */
export function getProjectsByPosition(id: PositionId) {
  const rank = (p: (typeof projects)[number]) =>
    (p.positions[0] === id ? 0 : 2) + (p.featured ? 0 : 1);
  return projects
    .filter((p) => p.positions.includes(id))
    .map((p, i) => ({ p, i }))
    .sort((a, b) => rank(a.p) - rank(b.p) || a.i - b.i)
    .map(({ p }) => p);
}

/** 전체 목록 기준 이전/다음 프로젝트 (끝에서는 반대쪽으로 순환) */
export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  const n = projects.length;
  return {
    prev: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}
