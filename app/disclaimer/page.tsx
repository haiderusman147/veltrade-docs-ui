import TopBar from "@/components/TopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimers about educational content, financial risk, and external links.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "VelTrade Disclaimer",
    description:
      "Important disclaimers about educational content, financial risk, and external links.",
    url: "/disclaimer",
    type: "website",
  },
};

export default function DisclaimerPage() {
  const siteName = "VelTrade";
  const contactEmail = "support@veltrade.co";

  return (
    <div>
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Disclaimer</h1>
        <p className="mt-3 text-zinc-600">Last updated: March 5, 2026</p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p>
            The content on <strong>{siteName}</strong> is provided for general
            informational and educational purposes only. It is not financial,
            investment, legal, or tax advice.
          </p>

          <h2>No professional relationship</h2>
          <p>
            Reading content on this website does not create a professional or
            advisory relationship between you and {siteName}. Consider
            consulting qualified professionals before making financial
            decisions.
          </p>

          <h2>Risk warning</h2>
          <p>
            Trading and investing involve risk, and you may lose some or all of
            your capital. Past performance does not guarantee future results.
            You are solely responsible for your decisions and outcomes.
          </p>

          <h2>Accuracy of information</h2>
          <p>
            We aim to keep content accurate and up to date, but we do not
            guarantee completeness, reliability, or suitability for any purpose.
            Information may change without notice.
          </p>

          <h2>External links</h2>
          <p>
            Some pages may include links to third-party websites or services. We
            do not control those sites and are not responsible for their
            content, policies, or practices.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this disclaimer, contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
