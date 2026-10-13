import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArtGallery from "@/components/ArtGallery";
import { art } from "@/data/art";
import { profile } from "@/config/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary-website.vercel.app";
const description = `A gallery of original paintings and sketches by ${profile.name} — acrylic studies, pencil work, and pen and ink pieces built over years of practice.`;

export const metadata: Metadata = {
  title: "My Art",
  description,
  alternates: { canonical: "/art" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/art`,
    title: `My Art — ${profile.name}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — My Art` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `My Art — ${profile.name}`,
    description,
    images: ["/opengraph-image"],
  },
};

export default function ArtPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary-website.vercel.app";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Artwork by ${profile.name}`,
    itemListElement: art.map((piece, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/art/${piece.slug}`,
      name: piece.title,
    })),
  };

  return (
    <div className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Creative Studio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">My Art</h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
            One slow, deliberate stroke at a time — the same patience that shows up in the rest of
            my work, applied to a canvas instead of a spreadsheet.
          </p>
        </div>

        <ArtGallery />
      </Container>
    </div>
  );
}
