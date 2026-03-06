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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute left-0 top-0 h-full w-[88%] max-w-[340px] bg-white shadow-xl">
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
          <div className="text-sm font-semibold text-zinc-900">Navigation</div>

          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Close
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-auto">
          <Sidebar nav={nav} mobile />
        </div>
      </div>
    </div>
  );
}
