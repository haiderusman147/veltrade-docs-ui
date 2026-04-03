import TopBar from "@/components/TopBar";
import { ADSTERRA_SOCIAL_BAR_SRC } from "@/lib/adsterra";
import Script from "next/script";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      {children}
      <Script
        id="adsterra-social-bar"
        src={ADSTERRA_SOCIAL_BAR_SRC}
        strategy="afterInteractive"
      />
    </div>
  );
}
