import type { MetadataRoute } from "next";

function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? "https://veltrade.co"
    : "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  const isProd = process.env.NODE_ENV === "production";
  const isPreview =
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

  const shouldIndex = isProd && !isPreview;

  return {
    rules: shouldIndex
      ? [
          {
            userAgent: "*",
            allow: "/",
          },
        ]
      : [
          {
            userAgent: "*",
            disallow: "/",
          },
        ],
    sitemap: `${base}/sitemap.xml`,
    host: shouldIndex ? base : undefined,
  };
}
