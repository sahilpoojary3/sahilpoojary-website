import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { insights, type ContentBlock } from "@/data/insights";
import { profile } from "@/config/profile";
import { formatIsoDate } from "@/lib/date";

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = insights.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.publishedDate,
      authors: [profile.name],
    },
  };
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="font-display text-2xl text-ink mt-10 mb-3">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent pl-5 my-6 text-ink-soft italic">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-ink-soft leading-relaxed">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "paragraph":
    default:
      return <p className="text-ink-soft leading-relaxed my-4">{block.text}</p>;
  }
}

export default async function InsightArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = insights.find((a) => a.slug === slug);
  if (!article) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary.vercel.app";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate ?? article.publishedDate,
    author: { "@type": "Person", name: profile.name, url: `${siteUrl}/author/sahil-poojary` },
    url: `${siteUrl}/insights/${article.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}/insights/${article.slug}` },
    ],
  };

  return (
    <div className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        <article className="max-w-2xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-soft">
            <Link href="/insights" className="underline-fade hover:text-accent">
              Insights
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-ink">{article.title}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {article.category}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-tight">
            {article.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <span>
              By{" "}
              <Link href="/author/sahil-poojary" className="text-accent underline-fade">
                {profile.name}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedDate}>{formatIsoDate(article.publishedDate)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>

          <div className="mt-10 text-base leading-relaxed">
            {article.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-line rounded-2xl">
            <p className="text-sm text-ink-soft">
              Read more about the work this comes from in{" "}
              <Link href="/#work" className="text-accent underline-fade">
                Selected Work
              </Link>{" "}
              or see the full{" "}
              <Link href="/#experience" className="text-accent underline-fade">
                Experience
              </Link>{" "}
              section.
            </p>
          </div>

          <Link
            href="/insights"
            className="group mt-10 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
          >
            <ArrowRight size={16} className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Insights
          </Link>
        </article>
      </Container>
    </div>
  );
}
