import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import { ADSTERRA_POPUNDER_SRC } from "@/lib/adsterra";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://veltrade.co"),

  title: {
    default: "VelTrade",
    template: "%s | VelTrade",
  },

  description:
    "VelTrade is a practical knowledge base for learning trading, crypto, and market fundamentals.",

  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },

  openGraph: {
    title: "VelTrade",
    description: "A practical trading and crypto knowledge base for beginners.",
    url: "https://veltrade.co",
    siteName: "VelTrade",
    images: ["/og.svg"],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">
        {children}
        <Footer />
        <CommandPalette />
        <Script
          id="adsterra-popunder"
          src={ADSTERRA_POPUNDER_SRC}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
