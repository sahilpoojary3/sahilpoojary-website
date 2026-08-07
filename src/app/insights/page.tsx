import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { insights } from "@/data/insights";
import { profile } from "@/config/profile";
import { formatIsoDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Insights",
  description: `Original, grounded writing by ${profile.name} on business, operations and leadership — drawn from real experience, not theory.`,
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Insights
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
            Notes from the field
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
            Short, grounded pieces on operations, leadership and business — written from things
            I&apos;ve actually done, not general theory.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {insights.map((article, i) => (
            <Reveal key={article.slug} delay={Math.min(i * 0.06, 0.2)}>
              <Link
                href={`/insights/${article.slug}`}
                className="group block rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.15)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {article.category}
                </p>
                <h2 className="font-display text-xl sm:text-2xl text-ink mt-2 leading-snug">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-ink-soft leading-relaxed">
                  {article.dek}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-ink-soft/70">
                  <span>
                    {formatIsoDate(article.publishedDate)} · {article.readingMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
