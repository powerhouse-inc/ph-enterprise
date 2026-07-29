import type { MetadataRoute } from "next";
import { USE_CASE_ORDER } from "@/data/use-cases-detail";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl();
  const now = new Date();

  const routes = [
    "",
    "/architecture",
    "/use-cases",
    ...USE_CASE_ORDER.map((slug) => `/use-cases/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
