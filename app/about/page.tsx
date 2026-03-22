import TopBar from "@/components/TopBar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VelTrade",
  description:
    "Learn about VelTrade and the mission behind this educational trading and crypto knowledge base.",
  alternates: { canonical: "/about" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About VelTrade",
    description:
      "Learn about VelTrade and the mission behind this educational trading and crypto knowledge base.",
    url: "/about",
    type: "website",
  },
};

export default function About() {
  return (
    <div>
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">About VelTrade</h1>

        <p className="mt-4 text-zinc-600">
          VelTrade is an educational knowledge base focused on explaining
          trading, cryptocurrency, and financial markets in a clear and
          practical way. The goal is to help beginners understand core concepts
          without hype, shortcuts, or unrealistic promises.
        </p>

        <p className="mt-4 text-zinc-600">
          The site is designed for learners who want to understand market
          structure, trading risk, and crypto systems before committing serious
          capital. The focus is on practical understanding rather than
          prediction, hype, or short-term excitement.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Our mission</h2>

          <p className="text-zinc-600">
            Financial markets can be confusing for newcomers. VelTrade breaks
            complex topics into structured docs, covering fundamentals, risk
            management, platform selection, and crypto security so learning can
            happen step by step.
          </p>

          <p className="text-zinc-600">
            Instead of speculation-driven content, the focus stays on
            understanding, discipline, and responsible decision making.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">What you’ll find here</h2>

          <ul className="list-disc pl-5 text-zinc-600 space-y-2">
            <li>Beginner guides for trading and investing fundamentals</li>
            <li>Crypto basics: wallets, exchanges, and key terminology</li>
            <li>Platform comparisons and fee breakdowns</li>
            <li>Security checklists and common scam patterns</li>
            <li>Risk-first frameworks for consistent learning</li>
          </ul>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Transparency</h2>

          <p className="text-zinc-600">
            The information on this website is for educational purposes only.
            VelTrade does not provide financial, investment, legal, or tax
            advice. Always do your own research and make decisions based on your
            personal situation.
          </p>
        </section>

        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Browse docs
          </Link>

          <Link
            href="/contact"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Contact
          </Link>

          <Link
            href="/privacy-policy"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}
