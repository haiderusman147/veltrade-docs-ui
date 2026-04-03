import AdsterraNativeBanner from "@/components/AdsterraNativeBanner";
import Toc from "@/components/TOC";
import { getExistingDocHrefs } from "@/lib/content-index.server";
import { getDocBySlug } from "@/lib/docs.server";
import { NAV } from "@/lib/nav";
import { filterNavByExisting } from "@/lib/nav-filter";
import { slugify } from "@/lib/toc";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import React from "react";

type PropsWithChildren = { children?: React.ReactNode };

function flattenNav(nav: { title: string; href?: string; children?: any[] }[]) {
  const out: { title: string; href: string }[] = [];

  const walk = (
    items: { title: string; href?: string; children?: any[] }[],
  ) => {
    for (const item of items) {
      if (item.href) {
        out.push({ title: item.title, href: item.href });
      }
      if (item.children?.length) {
        walk(item.children);
      }
    }
  };

  walk(nav);
  return out;
}

function toText(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join(" ");

  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<PropsWithChildren>;
    return toText(el.props.children);
  }

  return "";
}

function getRelatedDocs(
  currentHref: string,
  slug: string[],
  flat: { title: string; href: string }[],
  limit = 4,
) {
  const currentSection = slug.length > 1 ? slug[0] : null;

  const sameSection = currentSection
    ? flat.filter(
        (item) =>
          item.href !== currentHref &&
          item.href.startsWith(`/docs/${currentSection}/`),
      )
    : [];

  const fallback = flat.filter(
    (item) =>
      item.href !== currentHref &&
      !sameSection.some((same) => same.href === item.href),
  );

  return [...sameSection, ...fallback].slice(0, limit);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  const title = doc.title;
  const description = doc.description ?? "";
  const url = "/docs/" + slug.join("/");

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    description: doc.description ?? "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://veltrade.co/docs/${slug.join("/")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "VelTrade",
      url: "https://veltrade.co",
    },
    dateModified: doc.lastUpdated
      ? new Date(doc.lastUpdated).toISOString()
      : undefined,
  };

  const components = {
    h2: (props: any) => {
      const text = toText(props.children).trim();
      const id = slugify(text);
      return <h2 id={id} className="scroll-mt-24" {...props} />;
    },
    h3: (props: any) => {
      const text = toText(props.children).trim();
      const id = slugify(text);
      return <h3 id={id} className="scroll-mt-24" {...props} />;
    },
  };

  const existing = getExistingDocHrefs();
  const filteredNav = filterNavByExisting(NAV, existing);
  const flat = flattenNav(filteredNav);

  const currentHref = "/docs/" + slug.join("/");
  const idx = flat.findIndex((x) => x.href === currentHref);

  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
  const related = getRelatedDocs(currentHref, slug, flat, 4);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px]">
      <main className="min-h-[calc(100vh-56px)] px-4 sm:px-6 py-8 sm:py-10">
        <div className="mx-auto max-w-[760px]">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              {doc.title}
            </h1>

            {doc.description ? (
              <p className="mt-3 text-zinc-600">{doc.description}</p>
            ) : null}

            <div className="mt-4 text-sm text-zinc-500">
              {doc.readingMinutes} min read
              {doc.lastUpdated ? ` • Last updated ${doc.lastUpdated}` : ""}
            </div>
          </div>

          <div className="mb-8">
            <AdsterraNativeBanner />
          </div>

          <article className="prose prose-zinc max-w-none prose-sm sm:prose-base">
            <MDXRemote source={doc.content} components={components} />
          </article>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">Related topics</div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-6">
            <div className="text-sm font-semibold">Continue learning</div>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prev ? (
                <Link
                  href={prev.href}
                  className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50"
                >
                  <div className="text-xs text-zinc-500">Previous</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div className="rounded-xl border border-zinc-200 p-4 opacity-50">
                  <div className="text-xs text-zinc-500">Previous</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">
                    Not available
                  </div>
                </div>
              )}

              {next ? (
                <Link
                  href={next.href}
                  className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50"
                >
                  <div className="text-xs text-zinc-500">Next</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div className="rounded-xl border border-zinc-200 p-4 opacity-50">
                  <div className="text-xs text-zinc-500">Next</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">
                    Not available
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">Educational purpose</div>
            <p className="mt-2 text-sm text-zinc-600">
              This page is for educational purposes only and does not provide
              financial advice. Trading and investing involve risk and may
              result in loss of capital. Always do your own research and make
              decisions based on your personal situation.
            </p>
          </div>
        </div>
      </main>

      <div className="hidden xl:block sticky top-14 h-[calc(100vh-56px)]">
        <Toc items={doc.toc} />
      </div>
    </div>
  );
}
