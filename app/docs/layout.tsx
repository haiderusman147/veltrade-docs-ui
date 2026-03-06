import TopBar from "@/components/TopBar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
