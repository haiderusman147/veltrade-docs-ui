"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileSidebar from "./MobileSidebar";
import type { NavItem } from "@/lib/nav";
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16.2 16.2 21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
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
              className="lg:hidden inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4 text-zinc-600" />
              <span className="sr-only">Search</span>
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
              className="hidden lg:flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 hover:bg-zinc-50"
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Search docs…</span>
              <span className="ml-6 rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-500">
                Ctrl K
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
