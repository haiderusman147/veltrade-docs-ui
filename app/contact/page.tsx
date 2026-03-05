import TopBar from "@/components/TopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact VelTrade for feedback, corrections, or inquiries.",
  alternates: { canonical: "/contact" },
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
          If you have questions about the content, notice an error in a guide,
          or want to suggest improvements, feel free to reach out.
        </p>

        <section className="mt-8 rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold">Email</h2>

          <p className="mt-2 text-zinc-600">
            The easiest way to contact us is by email.
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
            If something seems outdated or unclear, include the page link and a
            short note about what you noticed. That makes it easier to review
            and improve quickly.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold">Business inquiries</h2>

          <p className="mt-2 text-zinc-600">
            For partnerships or other inquiries, contact us using the email
            above. We typically respond within a few business days.
          </p>
        </section>

        <div className="mt-10 text-sm text-zinc-500">
          Note: VelTrade does not provide financial advice or investment
          recommendations.
        </div>
      </main>
    </div>
  );
}
