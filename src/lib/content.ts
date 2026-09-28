import { builds } from "@/content/builds";
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

/** 해당 포지션 페이지에 보여줄 작은 결과물 */
export function getBuildsByPosition(id: PositionId) {
  return builds.filter((b) => b.positions.includes(id));
}
