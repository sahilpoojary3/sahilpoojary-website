import { Quote } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { recommendations } from "@/data/recommendations";
import { profile } from "@/config/profile";

export default function Recommendations() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Social Proof" title="What people say" align="center" />

        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {recommendations.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="h-full rounded-2xl border border-line bg-paper p-8">
                <Quote className="text-accent/50" size={22} aria-hidden="true" />
                <blockquote className="mt-4 text-sm sm:text-base text-ink-soft leading-relaxed">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-line">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-ink-soft mt-0.5">{r.context}</p>
                  <p className="text-xs text-ink-soft/70 mt-0.5">{r.date}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-ink-soft">
            Read more on{" "}
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-fade"
            >
              LinkedIn
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
