import { profile } from "@/content/profile";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "About", title: `${profile.name} ${profile.nameEn}`, description: `${profile.headline} · 경력 · 수상 · 자격증` });
}
