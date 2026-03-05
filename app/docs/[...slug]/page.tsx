import Sidebar from "@/components/Sidebar";
import Toc from "@/components/TOC";
import TopBar from "@/components/TopBar";
import { getDocBySlug } from "@/lib/docs.server";
import { slugify } from "@/lib/toc";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { NAV } from "@/lib/nav";
import { getExistingDocHrefs } from "@/lib/content-index.server";
import { filterNavByExisting } from "@/lib/nav-filter";
import React from "react";
import AdUnit from "@/components/AdUnit";

type PropsWithChildren = { children?: React.ReactNode };

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

  return (
    <div>
      <TopBar />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_260px]">
          <div className="hidden lg:block">
            <Sidebar nav={filteredNav} />
          </div>

          <main className="min-h-[calc(100vh-56px)] px-4 sm:px-6 py-8 sm:py-10">
            <div className="mx-auto max-w-3xl">
              {/* JSON-LD for faster indexing + richer understanding */}
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
                <AdUnit slot="1111111111" />
                <div className="mt-4 text-sm text-zinc-500">
                  {doc.readingMinutes} min read
                  {doc.lastUpdated ? ` • Last updated ${doc.lastUpdated}` : ""}
                </div>
              </div>

              <article className="prose prose-zinc max-w-none prose-sm sm:prose-base">
                <MDXRemote source={doc.content} components={components} />
              </article>
              <AdUnit slot="2222222222" />
              <div className="mt-12 border-t border-zinc-200 pt-6">
                <div className="text-sm font-semibold">Continue learning</div>

                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <a
                    href="/docs"
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 hover:bg-zinc-50"
                  >
                    Browse all docs
                  </a>

                  <a
                    href="/docs/introduction"
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 hover:bg-zinc-50"
                  >
                    Start with introduction
                  </a>
                </div>
              </div>
              <AdUnit slot="3333333333" />
              <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="text-sm font-semibold">Educational purpose</div>
                <p className="mt-2 text-sm text-zinc-600">
                  This page is for educational purposes only and does not
                  provide financial advice. Trading and investing involve risk
                  and may result in loss of capital. Always do your own research
                  and make decisions based on your personal situation.
                </p>
              </div>
            </div>
          </main>

          <div className="hidden xl:block">
            <Toc items={doc.toc} />
          </div>
        </div>
      </div>
    </div>
  );
}
