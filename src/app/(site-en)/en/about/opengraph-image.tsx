import { ogContentType, ogSize } from "@/lib/og";
import { aboutOg } from "@/lib/og-pages";

export const alt = "About";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return aboutOg("en");
}
