import { categoryHex } from "@/lib/category";
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
    eyebrow: project ? `Case Study · ${project.subtitle}` : "Case Study",
    title: project?.title ?? "Project",
    description: project?.highlights.slice(0, 2).join(" · "),
    accent: project ? categoryHex[project.category] : undefined,
  });
}
