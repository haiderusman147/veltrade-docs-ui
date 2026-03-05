import { getSiteStats } from "@/lib/site-stats.server";

export default function StatsStrip() {
  const stats = getSiteStats();

  // You can adjust these when you add more tracks later
  const tracks = 3; // Trading, Crypto, Platforms

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-2xl border border-zinc-200 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Articles
        </div>
        <div className="mt-1 text-2xl font-semibold">{stats.totalArticles}</div>
        <div className="mt-1 text-sm text-zinc-600">
          Written as a guided learning base
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Tracks
        </div>
        <div className="mt-1 text-2xl font-semibold">{tracks}</div>
        <div className="mt-1 text-sm text-zinc-600">
          Trading, Crypto, Platform guides
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Last updated
        </div>
        <div className="mt-1 text-2xl font-semibold">
          {stats.lastUpdatedLabel}
        </div>
        <div className="mt-1 text-sm text-zinc-600">
          New pages added steadily
        </div>
      </div>
    </div>
  );
}
