"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type AdSlotProps = {
  client: string; // e.g. "ca-pub-xxxxxxxxxxxx"
  slot: string; // ad unit slot id
  format?: string; // "auto" is fine
  className?: string;
  minHeight?: number; // reserve space to avoid layout shift
  fallbackTitle?: string;
  fallbackText?: string;
  fallbackHref?: string;
};

export default function AdSlot({
  client,
  slot,
  format = "auto",
  className = "",
  minHeight = 260,
  fallbackTitle = "Recommended reading",
  fallbackText = "Start with Trading Basics: market structure, risk, and common mistakes.",
  fallbackHref = "/trading-basics",
}: AdSlotProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    // Try rendering AdSense
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      setShowFallback(true);
      return;
    }

    // After a short delay, check whether ad has filled any space
    timeoutId = setTimeout(() => {
      const el = wrapRef.current;

      if (!el) return;

      // If AdSense didn't fill, the slot typically remains ~0 height
      const filled = el.offsetHeight > 40;
      if (!filled) setShowFallback(true);
    }, 1600);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}
      style={{ minHeight }}
    >
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-xs font-medium text-zinc-500">Sponsored</span>
        {showFallback && (
          <span className="text-xs text-zinc-400">Ad not available</span>
        )}
      </div>

      <div className="px-4 pb-4 pt-2">
        {!showFallback ? (
          <div ref={wrapRef} className="min-h-[200px]">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={client}
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          <a
            href={fallbackHref}
            className="block rounded-xl border border-zinc-200 bg-zinc-50 p-4 hover:bg-zinc-100 transition"
          >
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-lg bg-zinc-200 animate-pulse" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-zinc-900">
                  {fallbackTitle}
                </div>
                <div className="mt-1 text-sm text-zinc-600">{fallbackText}</div>
                <div className="mt-3 text-xs font-medium text-zinc-700">
                  Read now →
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
