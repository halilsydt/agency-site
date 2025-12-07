import type { MetadataRoute } from "next";

/**
 * Generates the robots.txt for the site.
 * Allows all user agents to crawl except the style-guide dev page.
 *
 * @returns Robots.txt configuration for Next.js
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/style-guide",
    },
    sitemap: "https://agency-site.vercel.app/sitemap.xml",
  };
}
