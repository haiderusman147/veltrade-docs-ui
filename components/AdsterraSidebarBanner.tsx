"use client";

import { useEffect } from "react";
import { ADSTERRA_HOMEPAGE_SIDE_BANNER } from "@/lib/adsterra";

const ADSTERRA_SIDEBAR_BANNER_CONTAINER_ID =
  "adsterra-homepage-side-banner";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, string>;
    };
  }
}

export default function AdsterraSidebarBanner() {
  useEffect(() => {
    const container = document.getElementById(
      ADSTERRA_SIDEBAR_BANNER_CONTAINER_ID,
    );

    if (!container) return;

    container.innerHTML = "";

    const options = {
      key: ADSTERRA_HOMEPAGE_SIDE_BANNER.key,
      format: ADSTERRA_HOMEPAGE_SIDE_BANNER.format,
      height: ADSTERRA_HOMEPAGE_SIDE_BANNER.height,
      width: ADSTERRA_HOMEPAGE_SIDE_BANNER.width,
      params: ADSTERRA_HOMEPAGE_SIDE_BANNER.params,
    };

    window.atOptions = options;

    const script = document.createElement("script");
    script.async = true;
    script.src = ADSTERRA_HOMEPAGE_SIDE_BANNER.src;
    script.setAttribute("data-cfasync", "false");

    container.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";

      if (window.atOptions === options) {
        delete window.atOptions;
      }
    };
  }, []);

  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
      aria-label="Advertisement"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">Sponsored</span>
        <span className="text-xs text-zinc-400">Ad</span>
      </div>

      <div
        id={ADSTERRA_SIDEBAR_BANNER_CONTAINER_ID}
        className="mx-auto min-h-[600px] w-[160px] overflow-hidden"
      />
    </section>
  );
}
