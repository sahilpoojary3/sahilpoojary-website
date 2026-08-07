import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArtGallery from "@/components/ArtGallery";
import { profile } from "@/config/profile";

export const metadata: Metadata = {
  title: "My Art",
  description: `A gallery of original paintings, sketches and creative work by ${profile.name}.`,
};

export default function ArtPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Creative Studio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">My Art</h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
            One slow, deliberate stroke at a time — the same patience that shows up in the rest of
            my work, applied to a canvas instead of a spreadsheet.
          </p>
        </div>

        <ArtGallery />
      </Container>
    </div>
  );
}
