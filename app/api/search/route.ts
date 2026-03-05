export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAllDocMetas, getDocBySlug } from "@/lib/docs.server";

// Create a plain-text excerpt from MDX body
function toPlainText(mdx: string) {
  return mdx
    // remove code blocks
    .replace(/```[\s\S]*?```/g, " ")
    // remove mdx/jsx tags
    .replace(/<[^>]+>/g, " ")
    // remove markdown links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // remove emphasis and headings markers
    .replace(/[#_*`>]/g, " ")
    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const metas = getAllDocMetas();

  // Build an index: titles + descriptions + headings + short excerpt
  const docs = metas.map((m) => {
    const doc = getDocBySlug(m.slug);

    const headings = doc.toc.map((h) => h.text);
    const plain = toPlainText(doc.content);
    const excerpt = plain.slice(0, 220);

    return {
      title: doc.title,
      description: doc.description ?? "",
      href: "/docs/" + doc.slug.join("/"),
      headings,
      excerpt,
      // a combined field for easy client-side search
      haystack: `${doc.title} ${doc.description ?? ""} ${headings.join(" ")} ${excerpt}`.toLowerCase(),
    };
  });

  return NextResponse.json({ docs });
}