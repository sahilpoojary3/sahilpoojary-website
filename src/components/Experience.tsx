"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Tag from "./ui/Tag";
import { experience } from "@/data/experience";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 sm:py-32 bg-paper-soft/60">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where the work actually happened"
          description="I've worked across non-profit leadership, hospitality operations, and industrial operations — each one sharpened a different muscle."
        />

        <div className="mt-14 space-y-4">
          {experience.map((role, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={role.org} delay={Math.min(i * 0.06, 0.24)}>
                <div className="rounded-2xl border border-line bg-paper transition-colors duration-300 hover:border-accent/40">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-start sm:items-center justify-between gap-4 text-left px-6 py-5 sm:px-8 sm:py-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-xl sm:text-2xl text-ink">{role.role}</h3>
                        <span className="text-sm text-ink-soft">{role.org}</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                        <span>
                          {role.start} — {role.end}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{role.employment}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} />
                          {role.location}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-ink-soft"
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                            {role.summary}
                          </p>
                          <ul className="mt-4 space-y-2.5">
                            {role.points.map((point) => (
                              <li
                                key={point}
                                className="flex gap-3 text-sm sm:text-base text-ink-soft leading-relaxed"
                              >
                                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {point}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {role.skills.map((skill) => (
                              <Tag key={skill}>{skill}</Tag>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
