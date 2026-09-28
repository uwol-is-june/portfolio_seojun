import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Portfolio", title: profile.headline, description: `${profile.name} · ${site.roles}` });
}
