"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; text: string; level: number };

export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the first visible heading closest to top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) =>
            a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1,
          );

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        root: null,
        // tune this to match your topbar height + reading comfort
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  if (!items?.length) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-14 h-[calc(100vh-56px)] overflow-auto border-l border-zinc-200 px-4 py-6">
        <div className="text-sm font-semibold">On this page</div>

        <nav className="mt-3 space-y-2 text-sm">
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <Link
                key={it.id}
                href={`#${it.id}`}
                className={[
                  "block hover:text-zinc-900",
                  it.level === 3 ? "pl-4" : "pl-0",
                  isActive ? "text-zinc-900 font-medium" : "text-zinc-600",
                ].join(" ")}
              >
                {it.text}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
