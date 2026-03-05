import TopBar from "@/components/TopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how VelTrade handles information, cookies, analytics, and advertising.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "VelTrade Privacy Policy",
    description:
      "Learn how VelTrade handles information, cookies, analytics, and advertising.",
    url: "/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const siteName = "VelTrade";
  const siteUrl = "https://veltrade.co";
  const contactEmail = "support@veltrade.co";

  return (
    <div>
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-zinc-600">Last updated: March 5, 2026</p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p>
            This Privacy Policy explains how <strong>{siteName}</strong>{" "}
            collects, uses, and protects information when you visit{" "}
            <strong>{siteUrl}</strong>.
          </p>

          <h2>Information we collect</h2>
          <p>
            We may collect non-personal information such as browser type, device
            information, pages visited, and approximate location (for example,
            country) to understand how the site is used and to improve content.
          </p>

          <h2>Cookies</h2>
          <p>
            Cookies are small files stored on your device. We may use cookies to
            improve user experience, remember preferences, and understand how
            visitors interact with the site.
          </p>

          <h2>Advertising and third-party vendors</h2>
          <p>
            We may display advertising. Third-party vendors, including Google,
            may use cookies to serve ads based on a user’s prior visits to this
            website or other websites.
          </p>
          <p>
            You can opt out of personalized advertising by adjusting Google Ads
            Settings. You can also manage cookies through your browser settings.
          </p>

          <h2>Analytics</h2>
          <p>
            We may use analytics tools to measure traffic and improve content.
            These tools may collect information such as the pages you visit and
            how long you stay.
          </p>

          <h2>External links</h2>
          <p>
            Our pages may include links to external sites. We are not
            responsible for the privacy practices of third-party websites.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
