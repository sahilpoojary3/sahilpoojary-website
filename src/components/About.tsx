import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import { profile } from "@/config/profile";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-paper-soft/60">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              About
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-ink">
              Strategy on paper is easy.{" "}
              <span className="text-accent">I care about what happens after.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-base sm:text-lg text-ink-soft leading-relaxed">
              <p>{profile.about.full}</p>
              <p>{profile.about.extra}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
