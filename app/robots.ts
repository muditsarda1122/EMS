import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // TODO(fact): P7. The Sitemap line needs an absolute URL, so it appears only once a domain is set.
    ...(siteConfig.domain ? { sitemap: `https://${siteConfig.domain}/sitemap.xml` } : {}),
  };
}
