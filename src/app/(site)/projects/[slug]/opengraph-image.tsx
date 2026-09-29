import { getDictionary } from "@/i18n/ui";
import { getProjects } from "@/lib/content";
import { ogContentType, ogSize } from "@/lib/og";
import { projectOg } from "@/lib/og-pages";

export const alt = getDictionary("ko").projectOgAlt;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getProjects("ko").map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return projectOg((await params).slug, "ko");
}
