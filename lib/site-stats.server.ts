import "server-only";
import { getAllDocMetas } from "@/lib/docs.server";

function parseDateSafe(s?: string) {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getSiteStats() {
  const metas = getAllDocMetas();

  const totalArticles = metas.length;

  const updatedDates = metas
    .map((m) => parseDateSafe(m.lastUpdated))
    .filter((d): d is Date => Boolean(d));

  const lastUpdated =
    updatedDates.length === 0
      ? null
      : new Date(Math.max(...updatedDates.map((d) => d.getTime())));

  return {
    totalArticles,
    lastUpdatedLabel: lastUpdated
      ? lastUpdated.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : "Recently",
  };
}