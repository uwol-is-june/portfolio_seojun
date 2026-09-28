import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${site.name} — ${site.roles}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Portfolio", title: site.roles, description: profile.headline });
}
