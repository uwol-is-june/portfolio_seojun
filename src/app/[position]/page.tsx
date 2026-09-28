import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiShowcase from "@/components/position/ai-showcase";
import PlannerShowcase from "@/components/position/planner-showcase";
import PmShowcase from "@/components/position/pm-showcase";
import PositionTemplate from "@/components/position/position-template";
import type { PositionId } from "@/content/types";
import { getBuildsByPosition, getPosition, getPositions, getProjectsByPosition } from "@/lib/content";
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

/** 포지션별 강조 섹션 (TASK-15~17) */
const showcases: Record<PositionId, React.ReactNode> = {
  "product-manager": <PmShowcase />,
  "service-planner": <PlannerShowcase />,
  "ai-product-builder": <AiShowcase />,
};

export default async function PositionPage(props: PageProps<"/[position]">) {
  const position = getPosition((await props.params).position);
  if (!position) notFound();

  return (
    <PositionTemplate
      position={position}
      projects={getProjectsByPosition(position.id)}
      // AI Product Builder는 강조 섹션에서 Builds 목록을 이미 보여줍니다.
      builds={position.id === "ai-product-builder" ? [] : getBuildsByPosition(position.id)}
      showcase={showcases[position.id]}
    />
  );
}
