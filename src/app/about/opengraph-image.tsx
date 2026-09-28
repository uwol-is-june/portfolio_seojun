import { profile } from "@/content/profile";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "About", title: "경력 · 스킬 · 연락처", description: profile.headline });
}
