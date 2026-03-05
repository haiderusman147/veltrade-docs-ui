import { NavItem } from "./nav";

export function filterNavByExisting(nav: NavItem[], existing: Set<string>): NavItem[] {
  const filtered: NavItem[] = [];

  for (const item of nav) {
    // leaf link
    if (item.href) {
      if (existing.has(item.href)) filtered.push(item);
      continue;
    }

    // section
    const kids = item.children ? filterNavByExisting(item.children, existing) : [];
    if (kids.length) filtered.push({ ...item, children: kids });
  }

  return filtered;
}