import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { professions } from "@/config/professions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/tools",
    "/pricing",
    "/about",
    "/contact",
    "/blog",
    "/careers",
    "/help",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
    "/security",
    "/refunds",
    "/accessibility",
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency:
        path === "" ? "weekly" : "monthly",
      priority:
        path === "" ? 1 : 0.7,
    })
  );

  const toolPages: MetadataRoute.Sitemap =
    tools.map((tool) => ({
      url: `${siteConfig.url}/tool/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const professionPages: MetadataRoute.Sitemap =
    professions.map((profession) => ({
      url: `${siteConfig.url}/profession/${profession.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...pages,
    ...toolPages,
    ...professionPages,
  ];
}