import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && (
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl sm:text-4xl leading-tight text-ink">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
