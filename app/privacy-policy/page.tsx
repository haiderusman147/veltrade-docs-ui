import TopBar from "@/components/TopBar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how VelTrade handles information, cookies, analytics, and advertising.",
  alternates: { canonical: "/privacy-policy" },
  robots: {
    index: true,
    follow: true,
  },
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
  const adVendorName = "Adsterra";
  const adVendorPrivacyUrl = "https://adsterra.com/privacy-policy-managed/";
  const adVendorCookiesUrl = "https://adsterra.com/cookies/";

  return (
    <div>
      <TopBar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-zinc-600">Last updated: April 4, 2026</p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p>
            This Privacy Policy explains how <strong>{siteName}</strong>{" "}
            collects, uses, and protects information when you visit{" "}
            <strong>{siteUrl}</strong>.
          </p>

          <h2>Information we collect</h2>
          <p>
            We may collect non-personal information such as browser type, device
            information, pages visited, and approximate location, such as
            country-level location, to understand how the site is used and to
            improve content.
          </p>

          <h2>Cookies</h2>
          <p>
            Cookies are small files stored on your device. We may use cookies to
            improve user experience, remember preferences, understand how
            visitors interact with the site, and support advertising and
            analytics features.
          </p>

          <h2>Advertising and third-party vendors</h2>
          <p>
            We may display advertising on this website through third-party ad
            partners, including <strong>{adVendorName}</strong>. These partners
            may use cookies, local storage, pixels, and similar technologies to
            deliver ads, limit frequency, measure performance, and personalize
            campaigns based on a user&apos;s activity on this website or other
            websites.
          </p>
          <p>
            Users can manage cookies through their browser settings. For more
            information about how {adVendorName} handles privacy and cookies,
            review{" "}
            <a
              href={adVendorPrivacyUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {adVendorName}&rsquo;s Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href={adVendorCookiesUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Cookies Policy
            </a>
            .
          </p>

          <h2>Analytics</h2>
          <p>
            We may use analytics tools to measure traffic, understand usage
            patterns, and improve the quality of the site. These tools may
            collect information such as the pages you visit and how long you
            stay.
          </p>

          <h2>External links</h2>
          <p>
            Our pages may include links to external websites. We are not
            responsible for the privacy practices, content, or policies of
            third-party websites.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact{" "}
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
            href="/terms"
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Terms of Service
          </Link>
        </div>
      </main>
    </div>
  );
}
