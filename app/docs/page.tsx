import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import { getExistingDocHrefs } from "@/lib/content-index.server";
import { getAllDocMetas } from "@/lib/docs.server";
import { NAV } from "@/lib/nav";
import { filterNavByExisting } from "@/lib/nav-filter";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Browse VelTrade documentation: trading fundamentals, crypto security, fees, and platform comparisons.",
  alternates: {
    canonical: "/docs",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VelTrade Docs",
    description:
      "Browse VelTrade documentation: trading fundamentals, crypto security, fees, and platform comparisons.",
    url: "/docs",
    type: "website",
  },
};

function parseDateSafe(s?: string) {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function DocsIndexPage() {
  const existing = getExistingDocHrefs();
  const filteredNav = filterNavByExisting(NAV, existing);
  const metas = getAllDocMetas();

  const newest = metas
    .map((m) => ({
      title: m.title,
      description: m.description ?? "",
      href: "/docs/" + m.slug.join("/"),
      lastUpdated: m.lastUpdated ?? "",
      date: parseDateSafe(m.lastUpdated),
    }))
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .slice(0, 8);

  return (
    <main className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Docs
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold leading-tight">
          Browse by topic
        </h1>
      </div>

      {/* Start here */}
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/docs/introduction"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">Start here</div>
            <div className="mt-2 text-sm text-zinc-600">
              A quick overview of how the docs are structured and how to use
              this site effectively.
            </div>
          </Link>

          <Link
            href="/docs/trading/basics"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">Trading Basics</div>
            <div className="mt-2 text-sm text-zinc-600">
              Learn order types, timeframes, common mistakes, and what
              risk-first thinking looks like in practice.
            </div>
          </Link>

          <Link
            href="/docs/crypto/security-checklist"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">Crypto Security</div>
            <div className="mt-2 text-sm text-zinc-600">
              Wallet safety, scams, and practical steps to reduce security risk
              before using real funds.
            </div>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <AdsterraNativeBanner />
      </section>

      {/* Categories */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Link
            href="/docs/introduction"
            className="text-sm text-zinc-600 hover:text-zinc-900 hover:underline"
          >
            Start with introduction →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNav.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-zinc-200 p-6"
            >
              <h3 className="text-sm font-semibold">{section.title}</h3>

              <div className="mt-3 space-y-2">
                {(section.children ?? []).map((item) => {
                  if (!item.href) return null;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newest */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Newest updates</h2>
          <Link
            className="text-sm text-zinc-600 hover:text-zinc-900 hover:underline"
            href="/docs/introduction"
          >
            Start here →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {newest.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
            >
              <div className="text-sm font-semibold">{p.title}</div>

              {p.description ? (
                <div className="mt-2 text-sm text-zinc-600 line-clamp-2">
                  {p.description}
                </div>
              ) : null}

              {p.lastUpdated ? (
                <div className="mt-3 text-xs text-zinc-500">
                  Updated: {p.lastUpdated}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      {/* All guides */}
      <section className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">All guides</h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {metas.map((m) => {
            const href = "/docs/" + m.slug.join("/");
            return (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
              >
                {m.title}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust note */}
      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-semibold">Educational purpose</h2>
        <p className="mt-2 text-sm text-zinc-600">
          VelTrade is an educational resource and does not provide financial
          advice. Trading and investing involve risk and may result in loss of
          capital. Always do your own research and make decisions based on your
          personal situation.
        </p>
      </section>
    </main>
  );
}
