import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-32 sm:py-40">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            404
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-4 text-base text-ink-soft leading-relaxed">
            The page you&apos;re looking for isn&apos;t here — it may have moved, or the link might be
            outdated.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/">Back to Home</Button>
            <Link href="/art" className="text-sm text-ink-soft underline-fade hover:text-accent">
              Explore the Art gallery
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
