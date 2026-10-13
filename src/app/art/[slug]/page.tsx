import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { art } from "@/data/art";
import { profile } from "@/config/profile";

export function generateStaticParams() {
  return art.map((piece) => ({ slug: piece.slug }));
}

// Target a consistent total length (not just a fixed slice of the body) —
// the medium prefix varies from piece to piece ("Acrylic on canvas. " vs.
// "Mixed media on canvas. "), so a fixed-length body slice was producing
// descriptions anywhere from 156 to 183 characters depending on the piece.
const MAX_DESCRIPTION_LENGTH = 155;

function buildDescription(piece: (typeof art)[number]): string {
  const prefix = `${piece.medium}. `;
  const budget = MAX_DESCRIPTION_LENGTH - prefix.length - 1; // -1 reserves room for an ellipsis
  const body = piece.description.trim();
  if (body.length <= budget) return `${prefix}${body}`;
  return `${prefix}${body.slice(0, budget).trim()}…`;
}

export async function generateMetadata(props: PageProps<"/art/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const piece = art.find((p) => p.slug === slug);
  if (!piece) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary-website.vercel.app";
  const title = `${piece.title} — Art by ${profile.name}`;
  const description = buildDescription(piece);
  const canonicalUrl = `${siteUrl}/art/${piece.slug}`;

  return {
    title: piece.title,
    description,
    alternates: { canonical: `/art/${piece.slug}` },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      images: [{ url: piece.image, alt: `${piece.title} — ${piece.medium} by ${profile.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [piece.image],
    },
  };
}

export default async function ArtworkPage(props: PageProps<"/art/[slug]">) {
  const { slug } = await props.params;
  const index = art.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const piece = art[index];
  const prev = art[(index - 1 + art.length) % art.length];
  const next = art[(index + 1) % art.length];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary-website.vercel.app";

  // VisualArtwork (not the generic CreativeWork) — it's the schema.org type
  // that actually defines `artMedium`. Using CreativeWork with artMedium
  // validated with a "property not recognized for this type" warning on
  // every single art piece.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: piece.title,
    description: piece.description,
    creator: { "@id": `${siteUrl}/#person` },
    artMedium: piece.medium,
    dateCreated: piece.date !== "Undated" ? piece.date : undefined,
    image: `${siteUrl}${piece.image}`,
    url: `${siteUrl}/art/${piece.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "My Art", item: `${siteUrl}/art` },
      { "@type": "ListItem", position: 3, name: piece.title, item: `${siteUrl}/art/${piece.slug}` },
    ],
  };

  return (
    <div className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink-soft">
          <Link href="/art" className="underline-fade hover:text-accent">
            My Art
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-ink">{piece.title}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={piece.image}
              alt={`${piece.title} — ${piece.medium} by ${profile.name}`}
              className="w-full h-auto"
            />
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {piece.category} · {piece.date}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-ink mt-2 leading-tight">
              {piece.title}
            </h1>
            <p className="text-sm text-ink-soft mt-2">{piece.medium}</p>
            <p className="mt-6 text-base text-ink-soft leading-relaxed whitespace-pre-line">
              {piece.description}
            </p>
            <p className="mt-8 text-sm text-ink-soft">
              Original artwork by{" "}
              <Link href="/#about" className="text-accent underline-fade">
                {profile.name}
              </Link>
              . See more in the{" "}
              <Link href="/art" className="text-accent underline-fade">
                full gallery
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex items-center justify-between">
          <Link
            href={`/art/${prev.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            {prev.title}
          </Link>
          <Link
            href={`/art/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
          >
            {next.title}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
