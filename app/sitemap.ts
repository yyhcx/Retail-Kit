import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/diagnose",
  "/tools",
  "/sales-target-calculator",
  "/dos-calculator",
  "/roi-calculator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/diagnose" ? 0.9 : 0.7,
  }));
}
