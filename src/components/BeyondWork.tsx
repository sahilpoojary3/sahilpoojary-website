import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { interests } from "@/data/interests";
import { art } from "@/data/art";

export default function BeyondWork() {
  return (
    <section className="py-24 sm:py-32 bg-paper-soft/60">
      <Container>
        <SectionHeading
          eyebrow="Beyond Work"
          title="A little more of me"
          description="Business fills most of my calendar — here's what fills the rest of it."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {interests.map((interest, i) => (
            <Reveal key={interest.title} delay={Math.min(i * 0.06, 0.24)}>
              <div className="h-full rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.15)]">
                <h3 className="font-display text-lg text-ink">{interest.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{interest.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-2xl border border-line bg-paper p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Palette size={18} />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink">Featured Art</h3>
                <p className="text-sm text-ink-soft mt-1 max-w-md">
                  {art.length > 0
                    ? "A selection of paintings and sketches — I bring the same patience to a canvas that I bring to a spreadsheet."
                    : "A gallery of paintings and sketches is on its way — check back soon."}
                </p>
              </div>
            </div>
            <Link
              href="/art"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent shrink-0"
            >
              Explore My Art
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
