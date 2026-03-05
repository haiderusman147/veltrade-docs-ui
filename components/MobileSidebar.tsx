"use client";

import { useEffect } from "react";
import Sidebar from "./Sidebar";
import type { NavItem } from "@/lib/nav";

export default function MobileSidebar({
  open,
  onClose,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
          <div className="font-semibold">Menu</div>
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-200 px-2 py-1 text-sm"
          >
            Close
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-auto">
          <Sidebar nav={nav} />
        </div>
      </div>
    </div>
  );
}
