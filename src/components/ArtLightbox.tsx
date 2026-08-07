"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Link2 } from "lucide-react";
import type { ArtPiece } from "@/data/art";

export default function ArtLightbox({
  pieces,
  index,
  onClose,
  onNavigate,
}: {
  pieces: ArtPiece[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const piece = pieces[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % pieces.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + pieces.length) % pieces.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, pieces.length, onClose, onNavigate]);

  if (!piece) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) onNavigate((index - 1 + pieces.length) % pieces.length);
    else if (delta < -50) onNavigate((index + 1) % pieces.length);
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={piece.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col lg:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>

        <div
          className="relative flex-1 min-h-[42vh] lg:min-h-0 flex items-center justify-center p-6 sm:p-10 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {pieces.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + pieces.length) % pieces.length)}
                aria-label="Previous artwork"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((index + 1) % pieces.length)}
                aria-label="Next artwork"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.img
            key={piece.image}
            src={piece.image}
            alt={`${piece.title} — ${piece.medium} by Sahil Poojary`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[38vh] lg:max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        <motion.div
          key={`${piece.image}-panel`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="lg:w-[24rem] xl:w-[27rem] shrink-0 overflow-y-auto max-h-[58vh] lg:max-h-full border-t lg:border-t-0 lg:border-l border-white/10 p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {piece.category} · {piece.date}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-white mt-2 leading-tight">
            {piece.title}
          </h2>
          <p className="text-sm text-white/50 mt-1.5">{piece.medium}</p>
          {piece.description && (
            <p className="text-sm sm:text-[15px] text-white/70 mt-5 leading-relaxed whitespace-pre-line">
              {piece.description}
            </p>
          )}
          <Link
            href={`/art/${piece.slug}`}
            onClick={onClose}
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
          >
            <Link2 size={12} />
            View permalink
          </Link>
          {pieces.length > 1 && (
            <p className="text-xs text-white/30 mt-8">
              {index + 1} / {pieces.length} — use ← → or swipe to browse
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
