import type { MetadataRoute } from "next";
import { getPublicSiteConfig } from "@/lib/posts";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getPublicSiteConfig();
  const base = (config.baseUrl?.trim() || "https://kaboomklub.com").replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
