"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileSidebar from "./MobileSidebar";
import type { NavItem } from "@/lib/nav";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState<NavItem[]>([]);
  const [navLoaded, setNavLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/nav", { cache: "no-store" });
        const text = await res.text();
        const data = text ? JSON.parse(text) : { nav: [] };
        setNav(data.nav || []);
      } catch {
        setNav([]);
      } finally {
        setNavLoaded(true);
      }
    })();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="rounded-md border border-zinc-200 px-2 py-1 text-sm lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            {/* Mobile quick search */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event("veltrade:open-search"))
              }
              className="lg:hidden rounded-md border border-zinc-200 px-2 py-1 text-sm"
              aria-label="Open search"
            >
              🔎
            </button>

            <Link href="/" className="font-semibold">
              VelTrade
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-3">
            <Link
              className="text-sm text-zinc-700 hover:text-zinc-900"
              href="/docs"
            >
              Docs
            </Link>

            <Link
              className="hidden sm:inline text-sm text-zinc-700 hover:text-zinc-900"
              href="/about"
            >
              About
            </Link>

            <Link
              className="hidden sm:inline text-sm text-zinc-700 hover:text-zinc-900"
              href="/contact"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event("veltrade:open-search"))
              }
              className="hidden lg:flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 hover:bg-zinc-50"
              aria-label="Open search"
            >
              <span className="text-sm text-zinc-500">Search…</span>
              <span className="ml-2 rounded border border-zinc-200 px-1.5 text-[10px] text-zinc-500">
                CTRL K
              </span>
            </button>
          </nav>
        </div>
      </header>

      <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
        nav={navLoaded ? nav : []}
      />
    </>
  );
}
