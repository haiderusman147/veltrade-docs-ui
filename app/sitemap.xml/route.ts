import { getAllDocMetas } from "@/lib/docs.server";

function getBaseUrl() {
  return "https://veltrade.co";
}

export async function GET() {
  const base = getBaseUrl();
  const docs = getAllDocMetas();
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: "/", priority: 1 },
    { url: "/docs", priority: 0.9 },
    { url: "/about", priority: 0.4 },
    { url: "/contact", priority: 0.3 },
    { url: "/privacy-policy", priority: 0.2 },
    { url: "/terms", priority: 0.2 },
  ];

  const urls = [
    ...staticRoutes.map(
      (r) => `
      <url>
        <loc>${base}${r.url}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${r.priority}</priority>
      </url>`
    ),
    ...docs.map(
      (d) => `
      <url>
        <loc>${base}/docs/${d.slug.join("/")}</loc>
        <lastmod>${
          d.lastUpdated
            ? new Date(d.lastUpdated).toISOString()
            : now
        }</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
