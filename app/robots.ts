import type { MetadataRoute } from "next";

function getBaseUrl() {
  // Always prefer your real domain for production indexing
  const prod = "https://veltrade.co";

  // If running locally, keep localhost
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";

  // In production builds, lock to veltrade.co
  return prod;
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  // Block indexing on preview deployments and non-production envs
  const isProd = process.env.NODE_ENV === "production";
  const isVercelPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

  const shouldIndex = isProd && !isVercelPreview;

  return {
    rules: shouldIndex
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${base}/sitemap.xml`,
  };
}