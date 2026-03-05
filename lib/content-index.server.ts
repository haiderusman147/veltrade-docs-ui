import "server-only";
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "docs");

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out: string[] = [];

  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && full.endsWith(".mdx")) out.push(full);
  }
  return out;
}

export function getExistingDocHrefs(): Set<string> {
  const files = walk(CONTENT_DIR);
  const hrefs = files.map((file) => {
    const rel = path.relative(CONTENT_DIR, file).replace(/\\/g, "/");
    const slug = rel.replace(/\.mdx$/, "");
    return `/docs/${slug}`;
  });
  return new Set(hrefs);
}