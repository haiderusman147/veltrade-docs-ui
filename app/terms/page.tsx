import TopBar from "@/components/TopBar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for VelTrade.",
  alternates: { canonical: "/terms" },
  robots: {
    index: true,
    follow: true,
  },
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
            accessing or using this website, you agree to these terms.
          </p>

          <h2>Educational purpose</h2>
          <p>
            All content provided on this website is for educational purposes
            only. It does not constitute financial, investment, legal, or tax
            advice. You are solely responsible for your decisions and actions.
          </p>

          <h2>No guarantees</h2>
          <p>
            Financial markets involve risk. While efforts are made to keep
            information accurate and up to date, no guarantees are provided
            regarding completeness, reliability, or outcomes from using the
            content.
          </p>

          <h2>External links</h2>
          <p>
            This website may include links to third-party websites. VelTrade is
            not responsible for the content, policies, or practices of external
            sites.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You agree not to misuse the website, attempt unauthorized access, or
            interfere with the normal operation of the site.
          </p>

          <h2>Changes to terms</h2>
          <p>
            These terms may be updated over time. Continued use of the website
            after changes are published implies acceptance of the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these terms, contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            About
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
