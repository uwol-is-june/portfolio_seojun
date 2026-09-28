import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPositions, getProjects } from "@/lib/content";

// /design-system은 내부용이라 넣지 않습니다.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...getPositions().map((p) => ({
      url: url(`/${p.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...getProjects().map((p) => ({
      url: url(`/projects/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: url("/about"), changeFrequency: "monthly", priority: 0.8 },
  ];
}
