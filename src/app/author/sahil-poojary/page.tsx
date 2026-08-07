import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { profile } from "@/config/profile";
import { insights } from "@/data/insights";
import { education } from "@/data/education";
import LinkedinIcon from "@/components/ui/LinkedinIcon";

export const metadata: Metadata = {
  title: "Author",
  description: `About ${profile.name}: business background, education, and areas of interest.`,
  alternates: { canonical: "/author/sahil-poojary" },
};

export default function AuthorPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary-website.vercel.app";

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
      sameAs: [profile.socials.linkedin],
    },
  };

  return (
    <div className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-5">
            <Image
              src="/images/profile.jpg"
              alt={profile.name}
              width={80}
              height={94}
              className="rounded-xl object-cover h-20 w-[4.25rem]"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Author
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink mt-1">{profile.name}</h1>
            </div>
          </div>

          <p className="mt-8 text-base text-ink-soft leading-relaxed">{profile.about.full}</p>
          <p className="mt-4 text-base text-ink-soft leading-relaxed">{profile.about.extra}</p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70 mb-2">
              Education
            </p>
            <ul className="space-y-1">
              {education.map((e) => (
                <li key={e.school} className="text-sm text-ink-soft">
                  {e.degree} — {e.school}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent underline-fade"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </Link>
            <Link href="/#about" className="text-sm text-accent underline-fade">
              Full professional profile
            </Link>
          </div>

          {insights.length > 0 && (
            <div className="mt-14 pt-8 border-t border-line">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70 mb-4">
                Articles by {profile.name}
              </p>
              <div className="space-y-3">
                {insights.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/insights/${article.slug}`}
                    className="block text-sm text-ink hover:text-accent underline-fade"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
