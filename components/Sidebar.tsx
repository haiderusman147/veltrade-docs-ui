"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/nav";

function NavLink({ title, href }: { title: string; href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "block rounded-md px-3 py-2 text-sm",
        isActive
          ? "bg-zinc-100 text-zinc-900"
          : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900",
      ].join(" ")}
    >
      {title}
    </Link>
  );
}

function NavNode({
  item,
  depth,
  openMap,
  setOpenMap,
}: {
  item: NavItem;
  depth: number;
  openMap: Record<string, boolean>;
  setOpenMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  // Leaf link
  if (item.href) {
    return (
      <div style={{ paddingLeft: depth * 8 }}>
        <NavLink title={item.title} href={item.href} />
      </div>
    );
  }

  const key = `${depth}:${item.title}`;
  const isOpen = openMap[key] ?? true;
  const hasChildren = (item.children?.length ?? 0) > 0;

  if (!hasChildren) return null;

  return (
    <div className="pt-2">
      <button
        onClick={() => setOpenMap((p) => ({ ...p, [key]: !isOpen }))}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 hover:bg-zinc-50"
      >
        {item.title}
        <span className="text-zinc-400">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavNode
              key={`${key}:${child.title}`}
              item={child}
              depth={depth + 1}
              openMap={openMap}
              setOpenMap={setOpenMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ nav = [] }: { nav?: NavItem[] }) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  return (
    <div className="sticky top-14 h-[calc(100vh-56px)] overflow-auto border-r border-zinc-200 px-3 py-4">
      {nav.length === 0 ? (
        <div className="px-3 py-2 text-sm text-zinc-500">No docs yet.</div>
      ) : (
        <div className="space-y-2">
          {nav.map((sec) => (
            <NavNode
              key={sec.title}
              item={sec}
              depth={0}
              openMap={openMap}
              setOpenMap={setOpenMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
