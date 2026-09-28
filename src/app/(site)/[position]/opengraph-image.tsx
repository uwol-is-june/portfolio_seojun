import { getPosition, getPositions } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "포지션 소개";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPositions().map((p) => ({ position: p.id }));
}

export default async function Image({ params }: { params: Promise<{ position: string }> }) {
  const position = getPosition((await params).position);
  return renderOgImage({
    eyebrow: "Position",
    title: position?.title ?? "Position",
    description: position?.tagline,
  });
}
