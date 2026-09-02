import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl();
  const now = new Date();

  const routes = [
    "",
    "/architecture",
    "/blog",
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
    "/use-cases",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
