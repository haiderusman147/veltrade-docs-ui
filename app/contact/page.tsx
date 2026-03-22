import TopBar from "@/components/TopBar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact VelTrade for feedback, corrections, or inquiries.",
  alternates: { canonical: "/contact" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact VelTrade",
    description: "Contact VelTrade for feedback, corrections, or inquiries.",
    url: "/contact",
    type: "website",
  },
};

export default function Contact() {
  return (
    <div>
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Contact</h1>

        <p className="mt-4 text-zinc-600">
          If you have questions about the content, notice something that needs
          correction, or want to suggest improvements, feel free to reach out.
          Clear feedback helps keep the material accurate and useful.
        </p>

        <section className="mt-8 rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold">Email</h2>

          <p className="mt-2 text-zinc-600">
            The simplest way to get in touch is by email.
          </p>

          <a
            href="mailto:support@veltrade.co"
            className="mt-3 inline-block text-sm font-medium text-zinc-900 hover:underline"
          >
            support@veltrade.co
          </a>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold">Content feedback</h2>

          <p className="mt-2 text-zinc-600">
            If something seems unclear or outdated, include the page link and a
            short description of the issue. This helps review and update the
            content more efficiently.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold">Business inquiries</h2>

          <p className="mt-2 text-zinc-600">
            For partnerships or other inquiries, use the same email above.
            Responses are usually provided within a few business days.
          </p>
        </section>

        {/* Internal links for SEO + trust */}
        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Browse docs
          </Link>

          <Link
            href="/about"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            About
          </Link>

          <Link
            href="/privacy-policy"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="mt-10 text-sm text-zinc-500">
          VelTrade provides educational content only and does not offer
          financial or investment advice.
        </div>
      </main>
    </div>
  );
}
