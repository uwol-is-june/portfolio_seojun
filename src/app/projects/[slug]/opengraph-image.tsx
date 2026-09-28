import { getProject, getProjects } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "프로젝트 케이스 스터디";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOgImage({
    eyebrow: project ? `Case Study · ${project.role}` : "Case Study",
    title: project?.title ?? "Project",
    description: project?.summary,
  });
}
