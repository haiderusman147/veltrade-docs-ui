"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type DocItem = {
  title: string;
  description: string;
  href: string;
  headings: string[];
  excerpt: string;
  haystack: string;
};

function scoreMatch(query: string, item: DocItem) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  // small scoring heuristic:
  // title match > headings > description > excerpt
  const title = item.title.toLowerCase();
  const desc = item.description.toLowerCase();
  const heads = item.headings.join(" ").toLowerCase();
  const ex = item.excerpt.toLowerCase();

  let score = 0;
  if (title.includes(q)) score += 6;
  if (heads.includes(q)) score += 4;
  if (desc.includes(q)) score += 3;
  if (ex.includes(q)) score += 2;

  // extra points for word-start matches in title
  if (title.split(" ").some((w) => w.startsWith(q))) score += 2;

  return score;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState<DocItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function loadIndexOnce() {
    if (loaded) return;
    const res = await fetch("/api/search", { cache: "no-store" });
    const text = await res.text();
    const data = text ? JSON.parse(text) : { docs: [] };
    setItems(data.docs || []);
    setLoaded(true);
  }

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        await loadIndexOnce();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };

    const onOpen = async () => {
      await loadIndexOnce();
      setOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("veltrade:open-search", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(
        "veltrade:open-search",
        onOpen as EventListener,
      );
    };
  }, [loaded]);

  const results = useMemo(() => {
    const term = q.trim();
    if (!term) return items.slice(0, 12);

    return items
      .map((it) => ({ it, s: scoreMatch(term, it) }))
      .filter((x) => x.s > 0 || x.it.haystack.includes(term.toLowerCase()))
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.it);
  }, [q, items]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
    >
      <div
        className="mx-auto mt-24 w-[92%] max-w-2xl rounded-xl border border-zinc-200 bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="border-b border-zinc-200 p-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, headings, and topics…"
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <div className="mt-2 hidden md:block text-xs text-zinc-500">
            Press Esc to close
          </div>
        </div>

        <div className="max-h-[460px] overflow-auto p-2">
          {results.length === 0 ? (
            <div className="p-3 text-sm text-zinc-500">No results</div>
          ) : (
            results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg p-3 hover:bg-zinc-50"
              >
                <div className="text-sm font-medium">{r.title}</div>

                {r.description ? (
                  <div className="mt-1 text-xs text-zinc-600 line-clamp-2">
                    {r.description}
                  </div>
                ) : r.excerpt ? (
                  <div className="mt-1 text-xs text-zinc-600 line-clamp-2">
                    {r.excerpt}
                  </div>
                ) : null}

                {r.headings?.length ? (
                  <div className="mt-2 text-[11px] text-zinc-500 line-clamp-1">
                    {r.headings.slice(0, 4).join(" • ")}
                  </div>
                ) : null}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
