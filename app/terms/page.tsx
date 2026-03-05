import TopBar from "@/components/TopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for VelTrade.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "VelTrade Terms of Service",
    description: "Terms of service for VelTrade.",
    url: "/terms",
    type: "website",
  },
};

export default function TermsPage() {
  const siteName = "VelTrade";
  const siteUrl = "https://veltrade.co";
  const contactEmail = "support@veltrade.co";

  return (
    <div>
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-3 text-zinc-600">Last updated: March 5, 2026</p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p>
            These Terms of Service govern your use of{" "}
            <strong>{siteName}</strong> at <strong>{siteUrl}</strong>. By
            accessing or using the site, you agree to these terms.
          </p>

          <h2>Educational purpose</h2>
          <p>
            The content on this website is provided for educational purposes
            only and does not constitute financial, investment, legal, or tax
            advice. You are responsible for your own decisions and actions.
          </p>

          <h2>No guarantees</h2>
          <p>
            Markets involve risk. We do not guarantee accuracy, completeness, or
            outcomes from using any information on this site.
          </p>

          <h2>External links</h2>
          <p>
            This website may link to third-party sites. We are not responsible
            for their content, policies, or practices.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You agree not to misuse the site, attempt unauthorized access, or
            disrupt site functionality.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these terms, contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
