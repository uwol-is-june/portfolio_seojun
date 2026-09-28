import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// /design-system은 페이지 자체에 noindex가 있어서 크롤링은 막지 않습니다. (막으면 noindex를 읽지 못합니다)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
