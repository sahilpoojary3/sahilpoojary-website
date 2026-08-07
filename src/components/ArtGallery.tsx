"use client";

import { useMemo, useState } from "react";
import { Palette } from "lucide-react";
import Reveal from "./ui/Reveal";
import ArtLightbox from "./ArtLightbox";
import { art, type ArtCategory } from "@/data/art";

export default function ArtGallery() {
  const [filter, setFilter] = useState<ArtCategory | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categoriesPresent = useMemo(
    () => Array.from(new Set(art.map((p) => p.category))),
    []
  );

  const filtered = useMemo(
    () => (filter === "All" ? art : art.filter((p) => p.category === filter)),
    [filter]
  );

  if (art.length === 0) {
    return (
      <div className="text-center py-20 rounded-3xl border border-dashed border-line">
        <Palette className="mx-auto text-ink-soft/50" size={32} aria-hidden="true" />
        <p className="mt-4 font-display text-xl text-ink">Artwork coming soon</p>
        <p className="mt-2 text-sm text-ink-soft max-w-sm mx-auto">
          This gallery is wired up and ready — pieces will appear here as soon as they&apos;re added
          to <code className="text-xs bg-paper-soft px-1.5 py-0.5 rounded">src/data/art.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {["All", ...categoriesPresent].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat as ArtCategory | "All")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              filter === cat
                ? "bg-accent text-paper"
                : "bg-transparent text-ink-soft border border-line hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {filtered.map((piece, i) => (
          <Reveal key={piece.image} delay={Math.min(i * 0.04, 0.2)} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full text-left rounded-xl overflow-hidden border border-line hover:border-accent/40 transition-all duration-300"
            >
              <div className="overflow-hidden">
                {/* Art pieces have unknown, varying aspect ratios for the
                    masonry layout — next/image requires fixed dimensions,
                    so a plain lazy-loaded img is intentional here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={piece.image}
                  alt={piece.title}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-ink">{piece.title}</p>
                <p className="text-xs text-ink-soft mt-0.5">
                  {piece.category} · {piece.date}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <ArtLightbox
          pieces={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
