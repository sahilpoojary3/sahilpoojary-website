import { ExternalLink } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Tag from "./ui/Tag";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { skillCategories } from "@/data/skills";
import { languages } from "@/data/languages";

export default function Credentials() {
  return (
    <section id="education" className="py-24 sm:py-32 bg-paper-soft/60">
      <Container>
        <SectionHeading
          eyebrow="Foundation"
          title="Education, credentials & capability"
          description="The formal training behind me, and the skills I've picked up along the way."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left column: Education + Certifications */}
          <div className="space-y-16">
            <div>
              <Reveal>
                <h3 className="font-display text-2xl text-ink mb-6">Education</h3>
              </Reveal>
              <div className="space-y-8">
                {education.map((e, i) => (
                  <Reveal key={e.school} delay={Math.min(i * 0.06, 0.2)}>
                    <div className="border-l-2 border-line pl-5">
                      <p className="text-xs text-ink-soft">
                        {e.start} — {e.end}
                        {e.detail ? ` · ${e.detail}` : ""}
                      </p>
                      <h4 className="font-display text-lg text-ink mt-1">{e.degree}</h4>
                      <p className="text-sm font-medium text-ink-soft">{e.school}</p>
                      {e.points.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {e.points.map((p) => (
                            <li key={p} className="text-sm text-ink-soft leading-relaxed">
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl text-ink mb-6">Licenses & Certifications</h3>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {certifications.map((c, i) => (
                  <Reveal key={c.name} delay={Math.min(i * 0.05, 0.2)}>
                    <div className="rounded-xl border border-line p-4 h-full transition-colors duration-300 hover:border-accent/40">
                      <p className="text-sm font-semibold text-ink leading-snug">{c.name}</p>
                      <p className="text-xs text-ink-soft mt-1">{c.issuer}</p>
                      <p className="text-xs text-ink-soft/80 mt-1">
                        Issued {c.issued}
                        {c.expires ? ` · Expires ${c.expires}` : ""}
                      </p>
                      {c.credentialUrl ? (
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                        >
                          Show credential <ExternalLink size={11} />
                        </a>
                      ) : c.credentialId ? (
                        <p className="mt-2 text-[11px] text-ink-soft/70">ID {c.credentialId}</p>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Skills + Languages */}
          <div className="space-y-16">
            <div>
              <Reveal>
                <h3 className="font-display text-2xl text-ink mb-6">Skills</h3>
              </Reveal>
              <div className="space-y-6">
                {skillCategories.map((cat, i) => (
                  <Reveal key={cat.category} delay={Math.min(i * 0.05, 0.2)}>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70 mb-2.5">
                        {cat.category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <Tag key={skill}>{skill}</Tag>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl text-ink mb-6">Languages</h3>
              </Reveal>
              <Reveal delay={0.06}>
                <dl className="divide-y divide-line rounded-xl border border-line overflow-hidden">
                  {languages.map((l) => (
                    <div key={l.name} className="flex items-center justify-between px-5 py-3.5">
                      <dt className="text-sm font-medium text-ink">{l.name}</dt>
                      <dd className="text-xs text-ink-soft">{l.proficiency}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
