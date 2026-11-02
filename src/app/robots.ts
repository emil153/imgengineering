import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** PROTOTYPE: disallow everything. At launch: rules { allow: "/", disallow: "/api/" } (sitemap line stays). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: "https://imgengi.com/sitemap.xml",
  };
}
