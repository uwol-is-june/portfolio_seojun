import { getProfile } from "@/lib/content";
import { ogContentType, ogSize } from "@/lib/og";
import { homeOg } from "@/lib/og-pages";

const profile = getProfile("en");
export const alt = `${profile.name} — ${profile.headline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return homeOg("en");
}
