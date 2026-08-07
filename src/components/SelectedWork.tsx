import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Tag from "./ui/Tag";
import { selectedWork } from "@/data/selectedWork";

const FIELDS: { key: keyof (typeof selectedWork)[number]; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "action", label: "What I Did" },
  { key: "outcome", label: "Outcome" },
  { key: "learned", label: "What I Learned" },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="A few moments worth telling in full"
          description="Not a portfolio of client logos — real situations, told the way I actually lived them."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {selectedWork.map((w, i) => (
            <Reveal key={w.title} delay={Math.min(i * 0.08, 0.24)}>
              <article className="h-full flex flex-col rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)] hover:border-accent/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{w.date}</p>
                <h3 className="font-display text-xl text-ink mt-2 leading-snug">{w.title}</h3>
                <p className="text-xs text-ink-soft mt-1 mb-5">{w.context}</p>

                <div className="space-y-4 flex-1">
                  {FIELDS.map((f) => (
                    <div key={f.label}>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/70">
                        {f.label}
                      </p>
                      <p className="text-sm text-ink-soft leading-relaxed mt-1">
                        {w[f.key] as string}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {w.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
