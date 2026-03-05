import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { extractTocFromMdx } from "./toc";

const CONTENT_DIR = path.join(process.cwd(), "content", "docs");

export type DocMeta = {
  slug: string[];
  title: string;
  description?: string;
  lastUpdated?: string;
};

export type Doc = DocMeta & {
  content: string;
  toc: { id: string; text: string; level: number }[];
  readingMinutes: number;
};

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (e.isFile() && full.endsWith(".mdx")) files.push(full);
  }
  return files;
}

function fileToSlug(filePath: string): string[] {
  const rel = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
  return rel.replace(/\.mdx$/, "").split("/");
}

export function getAllDocMetas(): DocMeta[] {
  const files = walk(CONTENT_DIR);

  return files
    .map((file) => {
      const raw = fs.readFileSync(file, "utf8");
      let data: any;
try {
  ({ data } = matter(raw));
} catch (e: any) {
  throw new Error(`Frontmatter error in: ${file}\n\n${e?.message || e}`);
}
      const slug = fileToSlug(file);

      return {
        slug,
        title: (data.title as string) ?? slug[slug.length - 1],
        description: data.description as string | undefined,
        lastUpdated: data.lastUpdated as string | undefined,
      };
    })
    .sort((a, b) => (a.title > b.title ? 1 : -1));
}

export function getDocBySlug(slug: string[]): Doc {
  const filePath = path.join(CONTENT_DIR, ...slug) + ".mdx";
  if (!fs.existsSync(filePath)) throw new Error(`Doc not found: ${filePath}`);

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const toc = extractTocFromMdx(content);
  const rt = readingTime(content);
  const minutes = Math.max(1, Math.round(rt.minutes));

  return {
    slug,
    title: (data.title as string) ?? slug[slug.length - 1],
    description: data.description as string | undefined,
    lastUpdated: data.lastUpdated as string | undefined,
    content,
    toc,
    readingMinutes: minutes,
  };
}