import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/privacy", "/terms", "/contact"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-10-03"),
    changeFrequency: route === "/" ? "weekly" : "yearly",
    priority: route === "/" ? 1 : 0.4,
  }));
}
