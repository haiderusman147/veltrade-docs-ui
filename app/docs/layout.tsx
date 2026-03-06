import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { getExistingDocHrefs } from "@/lib/content-index.server";
import { NAV } from "@/lib/nav";
import { filterNavByExisting } from "@/lib/nav-filter";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const existing = getExistingDocHrefs();
  const filteredNav = filterNavByExisting(NAV, existing);

  return (
    <div>
      <TopBar />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_150px]">
          <div className="hidden lg:block">
            <Sidebar nav={filteredNav} />
          </div>

          <div>{children}</div>

          <div className="hidden xl:block sticky top-14 h-[calc(100vh-56px)]" />
        </div>
      </div>
    </div>
  );
}
