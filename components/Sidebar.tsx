"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { NavItem } from "@/lib/nav";

function Chevron({
  open,
  visible = true,
}: {
  open?: boolean;
  visible?: boolean;
}) {
  if (!visible) return <span className="w-4 shrink-0" />;

  return (
    <svg
      className={[
        "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200",
        open ? "rotate-90" : "rotate-0",
      ].join(" ")}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.23 5.21a.75.75 0 0 1 1.06.02l4.25 4.5a.75.75 0 0 1 0 1.04l-4.25 4.5a.75.75 0 1 1-1.08-1.04L10.96 10 7.21 6.25a.75.75 0 0 1 .02-1.04Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DotIcon() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400" />;
}

function getItemIcon(title: string) {
  const key = title.toLowerCase();

  if (key.includes("overview")) {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 9.5 10 4l7 5.5V17a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (key.includes("insight") || key.includes("guide")) {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 3.5a5.5 5.5 0 0 0-3.63 9.63c.4.36.63.86.63 1.4V15h6v-.47c0-.54.23-1.04.63-1.4A5.5 5.5 0 0 0 10 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 17h4M8.5 15h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key.includes("performance") || key.includes("strategy")) {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 13 8 9l3 3 5-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 6h3v3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (key.includes("search") || key.includes("url")) {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="8.5"
          cy="8.5"
          r="4.75"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m12 12 4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key.includes("page") || key.includes("docs")) {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 3.5h5l3 3V16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M11 3.5V7h3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <DotIcon />;
}

function NavLink({
  title,
  href,
  depth,
}: {
  title: string;
  href: string;
  depth: number;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const isTopLevel = depth === 0;
  const icon = isTopLevel ? getItemIcon(title) : <DotIcon />;

  return (
    <Link
      href={href}
      scroll={false}
      className={[
        "group flex items-center gap-3 rounded-full transition-colors",
        isTopLevel ? "px-4 py-2.5 text-[14px]" : "px-4 py-2 text-[13px]",
        isActive
          ? "bg-sky-100 text-zinc-900"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
      ].join(" ")}
      style={{ marginLeft: depth > 0 ? depth * 10 : 0 }}
    >
      <span
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center",
          isActive
            ? "text-zinc-900"
            : "text-zinc-500 group-hover:text-zinc-700",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className={isActive ? "font-medium" : "font-normal"}>{title}</span>
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
  const pathname = usePathname();

  const hasChildren = (item.children?.length ?? 0) > 0;
  const key = `${depth}:${item.title}`;
  const isOpen = openMap[key] ?? true;

  const childHasActive = useMemo(() => {
    if (!hasChildren) return false;

    const walk = (nodes: NavItem[]): boolean => {
      for (const n of nodes) {
        if (n.href && pathname === n.href) return true;
        if (n.children?.length && walk(n.children)) return true;
      }
      return false;
    };

    return walk(item.children || []);
  }, [hasChildren, item.children, pathname]);

  if (item.href) {
    return <NavLink title={item.title} href={item.href} depth={depth} />;
  }

  if (!hasChildren) return null;

  const isSection = depth === 0;

  return (
    <div className={isSection ? "pt-2" : "pt-1"}>
      {isSection ? (
        <>
          <button
            type="button"
            onClick={() => setOpenMap((p) => ({ ...p, [key]: !isOpen }))}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12.5px] font-medium text-zinc-600 hover:text-zinc-800"
          >
            <Chevron open={isOpen} />
            <span>{item.title}</span>
          </button>

          <div className="mt-1 border-b border-zinc-200 pb-3">
            {isOpen && (
              <div className="space-y-1">
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
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setOpenMap((p) => ({ ...p, [key]: !isOpen }))}
            className={[
              "flex w-full items-center gap-2 rounded-full px-4 py-2 text-left text-[13px] transition-colors",
              childHasActive
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
            ].join(" ")}
            style={{ marginLeft: depth * 10 }}
          >
            <Chevron open={isOpen} />
            <span className="font-medium">{item.title}</span>
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
        </>
      )}
    </div>
  );
}

export default function Sidebar({
  nav = [],
  mobile = false,
}: {
  nav?: NavItem[];
  mobile?: boolean;
}) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  return (
    <aside
      className={
        mobile
          ? "h-full overflow-auto bg-white px-2 py-4"
          : "sticky top-14 h-[calc(100vh-56px)] overflow-auto bg-white px-2 py-4"
      }
    >
      {nav.length === 0 ? (
        <div className="px-4 py-2 text-sm text-zinc-500">No docs yet.</div>
      ) : (
        <div className="space-y-1">
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
    </aside>
  );
}
