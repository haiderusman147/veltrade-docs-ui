import StatsStrip from "@/components/StatsStrip";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10 sm:py-14">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            VelTrade Docs
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
            A practical trading and crypto knowledge base for beginners
          </h1>

          <p className="mt-4 text-zinc-600">
            Clear explanations, grounded examples, and a structured learning
            path. Built for people who want to understand markets without hype,
            shortcuts, or unrealistic promises.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/docs/introduction"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Start here
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Browse all docs
            </Link>

            <Link
              href="/docs/trading/basics"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Trading basics
            </Link>
          </div>

          <div className="mt-5 text-sm text-zinc-500">
            Tip: Press{" "}
            <span className="rounded border border-zinc-200 px-1.5 py-0.5 text-xs">
              Ctrl
            </span>{" "}
            +{" "}
            <span className="rounded border border-zinc-200 px-1.5 py-0.5 text-xs">
              K
            </span>{" "}
            to search.
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* Quick paths */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-sm font-semibold">Start with fundamentals</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Learn the basics: order types, timeframes, and risk control. Build a
            routine you can actually follow.
          </p>
          <Link
            href="/docs/trading/basics"
            className="mt-4 inline-flex text-sm font-medium text-zinc-900 hover:underline"
          >
            Go to Trading Basics →
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-sm font-semibold">Understand crypto safely</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Wallets, exchanges, fees, stablecoins, and common scams. Focus on
            security before profits.
          </p>
          <Link
            href="/docs/crypto/security-checklist"
            className="mt-4 inline-flex text-sm font-medium text-zinc-900 hover:underline"
          >
            Go to Crypto Security →
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-sm font-semibold">Choose platforms wisely</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Learn how to compare exchanges and apps with a beginner lens:
            clarity, fees, and reliability.
          </p>
          <Link
            href="/docs/platforms/best-crypto-exchanges"
            className="mt-4 inline-flex text-sm font-medium text-zinc-900 hover:underline"
          >
            Explore platform guides →
          </Link>
        </div>
      </section>

      {/* Featured reading */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Featured reading</h2>
          <Link
            href="/docs"
            className="text-sm text-zinc-600 hover:text-zinc-900 hover:underline"
          >
            Browse docs →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/trading/risk-management"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">Risk Management</div>
            <div className="mt-2 text-sm text-zinc-600">
              The foundation of long-term survival in markets. Position sizing,
              stop losses, and rule-based thinking.
            </div>
          </Link>

          <Link
            href="/docs/platforms/spot-vs-futures"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">Spot vs Futures</div>
            <div className="mt-2 text-sm text-zinc-600">
              Why leverage changes everything, what liquidation really means,
              and what beginners should avoid.
            </div>
          </Link>

          <Link
            href="/docs/crypto/fees"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">Crypto Trading Fees</div>
            <div className="mt-2 text-sm text-zinc-600">
              Trading fees, spreads, and network costs explained simply, with
              practical ways to reduce fee leakage.
            </div>
          </Link>

          <Link
            href="/docs/trading/how-much-money-to-start"
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <div className="text-sm font-semibold">
              How Much Money to Start?
            </div>
            <div className="mt-2 text-sm text-zinc-600">
              A realistic way to think about starting capital, learning funds,
              and scaling only after discipline is consistent.
            </div>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-semibold">A quick note</h2>
        <p className="mt-2 text-sm text-zinc-600">
          This website is for educational purposes only and does not provide
          financial advice. Trading and investing involve risk and may result in
          loss of capital.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/disclaimer"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
          >
            Read disclaimer
          </Link>
          <Link
            href="/privacy-policy"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
          >
            Privacy policy
          </Link>
          <Link
            href="/docs/introduction"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
          >
            Start learning
          </Link>
        </div>
      </section>
    </main>
  );
}
