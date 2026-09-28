import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/project/case-study";
import type { Position } from "@/content/types";
import { getPosition, getProject, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await props.params).slug);
  if (!project) return {};
  return pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}` });
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  const positions = project.positions.map(getPosition).filter((p): p is Position => Boolean(p));

  return <CaseStudy project={project} positions={positions} />;
}
