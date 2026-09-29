import { getDictionary } from "@/i18n/ui";
import { getPositions } from "@/lib/content";
import { ogContentType, ogSize } from "@/lib/og";
import { positionOg } from "@/lib/og-pages";

export const alt = getDictionary("en").positionOgAlt;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPositions("en").map((p) => ({ position: p.id }));
}

export default async function Image({ params }: { params: Promise<{ position: string }> }) {
  return positionOg((await params).position, "en");
}
