import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuilderShowcase from "@/components/position/builder-showcase";
import PlannerShowcase from "@/components/position/planner-showcase";
import PmShowcase from "@/components/position/pm-showcase";
import PositionTemplate from "@/components/position/position-template";
import type { PositionId } from "@/content/types";
import { getBuildsByPosition, getPosition, getPositions, getProjects, getProjectsByPosition } from "@/lib/content";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPositions().map((p) => ({ position: p.id }));
}

export async function generateMetadata(props: PageProps<"/[position]">): Promise<Metadata> {
  const position = getPosition((await props.params).position);
  if (!position) return {};
  return pageMetadata({ title: position.title, description: position.tagline, path: `/${position.id}` });
}

/** 포지션별 강조 섹션 */
const showcases: Record<PositionId, React.ReactNode> = {
  "product-manager": <PmShowcase />,
  "service-planner": <PlannerShowcase />,
  "ai-product-builder": <BuilderShowcase />,
};

export default async function PositionPage(props: PageProps<"/[position]">) {
  const position = getPosition((await props.params).position);
  if (!position) notFound();

  // AI Product Builder 하단: PM · Service Planner의 대표 프로젝트로 넘어가는 블록
  const t = getT();
  const isAi = position.id === "ai-product-builder";
  const related = isAi
    ? {
        positions: getPositions().filter((p) => p.id !== position.id),
        projects: getProjects().filter((p) => p.featured && p.positions[0] !== position.id),
      }
    : undefined;

  const projects = getProjectsByPosition(position.id);
  // AI Product Builder: 개인 프로젝트와 회사(인카금융서비스)에서 만든 프로젝트를 나눠 보여줍니다.
  const projectGroups = isAi
    ? [
        { id: "personal", title: t.personalProjects, projects: projects.filter((p) => p.affiliation !== "company") },
        {
          id: "company",
          title: t.companyProjects,
          description: t.companyProjectsNote,
          projects: projects.filter((p) => p.affiliation === "company"),
        },
      ]
    : undefined;

  return (
    <PositionTemplate
      position={position}
      projects={projects}
      projectGroups={projectGroups}
      builds={getBuildsByPosition(position.id)}
      related={related}
      showcase={showcases[position.id]}
    />
  );
}
