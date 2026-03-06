import Sidebar from "@/components/Sidebar";
import { getExistingDocHrefs } from "@/lib/content-index.server";
import { NAV } from "@/lib/nav";
import { filterNavByExisting } from "@/lib/nav-filter";

export default function DocSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const existing = getExistingDocHrefs();
  const filteredNav = filterNavByExisting(NAV, existing);

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <Sidebar nav={filteredNav} />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
