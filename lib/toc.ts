export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+={}[\]|\\:;"'<>,.?/]/g, "") // remove punctuation
    .replace(/\s+/g, "-") // spaces → hyphen
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

export function extractTocFromMdx(mdx: string) {
  const lines = mdx.split("\n");

  const toc: { id: string; text: string; level: number }[] = [];
  const usedIds = new Map<string, number>();

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length;
    const text = match[2]
      .replace(/\s+#*$/, "")
      .replace(/[`*_]/g, "") // remove md formatting
      .trim();

    let id = slugify(text);

    // handle duplicate headings
    if (usedIds.has(id)) {
      const count = (usedIds.get(id) ?? 0) + 1;
      usedIds.set(id, count);
      id = `${id}-${count}`;
    } else {
      usedIds.set(id, 0);
    }

    toc.push({ id, text, level });
  }

  return toc;
}