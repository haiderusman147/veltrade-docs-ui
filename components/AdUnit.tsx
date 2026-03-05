"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type AdUnitProps = {
  slot: string;
  className?: string;

  /** reserve space to avoid layout jump */
  minHeight?: number;

  /** use when you want a tighter slot (e.g., sidebar) */
  variant?: "inArticle" | "sidebar" | "footer";

  /** fallback content when ads don't render */
  fallback?: {
    title?: string;
    text?: string;
    href?: string;
    cta?: string;
  };
};

export default function AdUnit({
  slot,
  className = "",
  minHeight,
  variant = "inArticle",
  fallback,
}: AdUnitProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const cfg = useMemo(() => {
    // sensible defaults per placement
    if (variant === "sidebar") {
      return {
        minHeight: minHeight ?? 600,
        label: "Sponsored",
      };
    }
    if (variant === "footer") {
      return {
        minHeight: minHeight ?? 200,
        label: "Sponsored",
      };
    }
    // inArticle
    return {
      minHeight: minHeight ?? 260,
      label: "Sponsored",
    };
  }, [variant, minHeight]);

  const fb = {
    title: fallback?.title ?? "Keep learning on VelTrade",
    text:
      fallback?.text ??
      "If ads are unavailable right now, continue with a focused guide that builds the fundamentals step by step.",
    href: fallback?.href ?? "/docs/introduction",
    cta: fallback?.cta ?? "Read next",
  };

  useEffect(() => {
    // If client id is missing, skip AdSense entirely and show fallback
    if (!client) {
      setShowFallback(true);
      return;
    }

    // Try to request an ad
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      setShowFallback(true);
      return;
    }

    // After a short delay, check if the ad filled
    const t = window.setTimeout(() => {
      const el = wrapRef.current;
      if (!el) return;

      // If AdSense doesn't fill, it often remains too small/empty
      const filled = el.offsetHeight > 40;
      if (!filled) setShowFallback(true);
    }, 1400);

    return () => window.clearTimeout(t);
  }, [client, slot]);

  return (
    <section
      className={[
        "rounded-2xl border border-zinc-200 bg-white shadow-sm",
        className,
      ].join(" ")}
      style={{ minHeight: cfg.minHeight }}
      aria-label="Advertisement"
    >
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-xs font-medium text-zinc-500">{cfg.label}</span>
        {showFallback ? (
          <span className="text-xs text-zinc-400">Not available</span>
        ) : (
          <span className="text-xs text-zinc-400">Ad</span>
        )}
      </div>

      <div className="px-4 pb-4 pt-2">
        {!showFallback ? (
          <div ref={wrapRef} className="min-h-[140px]">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={client}
              data-ad-slot={slot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          <a
            href={fb.href}
            className="group block rounded-xl border border-zinc-200 bg-zinc-50 p-4 hover:bg-zinc-100 transition"
          >
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-lg bg-zinc-200/80" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-zinc-900">
                  {fb.title}
                </div>
                <div className="mt-1 text-sm text-zinc-600">{fb.text}</div>
                <div className="mt-3 inline-flex items-center text-xs font-medium text-zinc-800">
                  {fb.cta}{" "}
                  <span className="ml-1 group-hover:translate-x-0.5 transition">
                    →
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
