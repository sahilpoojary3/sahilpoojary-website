import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { monthYearToSortable } from "@/lib/date";
import { GraduationCap, Briefcase } from "lucide-react";

type Milestone = {
  kind: "education" | "experience";
  title: string;
  org: string;
  start: string;
  end: string;
  summary: string;
};

const milestones: Milestone[] = [
  ...education.map((e) => ({
    kind: "education" as const,
    title: e.degree,
    org: e.school,
    start: e.start,
    end: e.end,
    summary: e.points[0] ?? "",
  })),
  ...experience.map((e) => ({
    kind: "experience" as const,
    title: e.role,
    org: e.org,
    start: e.start,
    end: e.end,
    summary: e.summary,
  })),
].sort((a, b) => monthYearToSortable(a.start) - monthYearToSortable(b.start));

export default function Journey() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Career Journey"
          title="A steady climb, one deliberate step at a time"
          description="Education and experience, side by side, in the order they happened."
        />

        <div className="relative mt-16 pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />

          <ol className="space-y-12">
            {milestones.map((m, i) => (
              <li key={`${m.org}-${m.start}`} className="relative">
                <Reveal delay={Math.min(i * 0.05, 0.3)}>
                  <span
                    className="absolute -left-8 sm:-left-10 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-paper"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
                      {m.kind === "education" ? <GraduationCap size={13} /> : <Briefcase size={13} />}
                      {m.kind === "education" ? "Education" : "Experience"}
                    </span>
                    <span className="text-xs text-ink-soft">
                      {m.start} — {m.end}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-ink">{m.title}</h3>
                  <p className="text-sm font-medium text-ink-soft mt-0.5">{m.org}</p>
                  {m.summary && (
                    <p className="mt-2 text-sm sm:text-base text-ink-soft leading-relaxed max-w-2xl">
                      {m.summary}
                    </p>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
