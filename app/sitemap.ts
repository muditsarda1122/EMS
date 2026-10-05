import type { MetadataRoute } from "next";
import { siteConfig, isExperimentVisible } from "@/content/site.config";
import { getNoteSlugs } from "@/lib/markdown";

export const dynamic = "force-static";

const PATHS = [
  "/",
  "/how-it-works",
  "/research",
  "/research/biological-memory-architecture",
  "/research/ec-bench",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO(fact): P7. Sitemap URLs must be absolute, so there are no entries until a domain is set.
  if (!siteConfig.domain) return [];
  const paths = [...PATHS, ...getNoteSlugs().map((s) => `/research/notes/${s}`)];
  if (isExperimentVisible()) paths.push("/research/continuity-experiment");
  return paths.map((p) => ({ url: `https://${siteConfig.domain}${p}` }));
}
