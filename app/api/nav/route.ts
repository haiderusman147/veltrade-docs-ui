export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { NAV } from "@/lib/nav";
import { getExistingDocHrefs } from "@/lib/content-index.server";
import { filterNavByExisting } from "@/lib/nav-filter";

export async function GET() {
  const existing = getExistingDocHrefs();
  const filtered = filterNavByExisting(NAV, existing);
  return NextResponse.json({ nav: filtered });
}