import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Open to every crawler, AI assistants included (GPTBot, OAI-SearchBot,
// ClaudeBot, PerplexityBot, Google-Extended...): the whole point is to be found.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
