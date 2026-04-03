"use client";

import { useEffect } from "react";

const ADSTERRA_NATIVE_BANNER_SCRIPT_SRC =
  "https://disintegratehesitate.com/892dd6b0c3c4b3a9b9285a136421a472/invoke.js";
const ADSTERRA_NATIVE_BANNER_CONTAINER_ID =
  "container-892dd6b0c3c4b3a9b9285a136421a472";

export default function AdsterraNativeBanner() {
  useEffect(() => {
    const container = document.getElementById(
      ADSTERRA_NATIVE_BANNER_CONTAINER_ID,
    );

    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.src = ADSTERRA_NATIVE_BANNER_SCRIPT_SRC;
    script.setAttribute("data-cfasync", "false");

    container.parentElement?.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, []);

  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
      aria-label="Advertisement"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">Sponsored</span>
        <span className="text-xs text-zinc-400">Adsterra</span>
      </div>

      <div
        id={ADSTERRA_NATIVE_BANNER_CONTAINER_ID}
        className="min-h-[280px] w-full overflow-hidden"
      />
    </section>
  );
}
