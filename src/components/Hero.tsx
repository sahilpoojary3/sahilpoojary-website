"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Container from "./ui/Container";
import Button from "./ui/Button";
import LinkedinIcon from "./ui/LinkedinIcon";
import { profile } from "@/config/profile";
import { useFileExists } from "@/lib/useFileExists";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const resumeExists = useFileExists(profile.resume.path);

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Subtle ambient backdrop — decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent-soft), transparent 70%)" }}
          animate={reduce ? undefined : { y: [0, 20, 0], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-6rem] left-[-8%] h-80 w-80 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, var(--color-accent-soft), transparent 70%)" }}
          animate={reduce ? undefined : { y: [0, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={reduce ? undefined : container}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            className="lg:col-span-3"
          >
            <motion.p
              variants={reduce ? undefined : item}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6"
            >
              <MapPin size={13} />
              {profile.location}
            </motion.p>

            <motion.h1
              variants={reduce ? undefined : item}
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : item}
              className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl"
            >
              {profile.headline}
            </motion.p>

            <motion.p
              variants={reduce ? undefined : item}
              className="mt-4 text-base sm:text-lg text-ink-soft/90 leading-relaxed max-w-xl"
            >
              {profile.tagline} {profile.openTo}.
            </motion.p>

            <motion.div variants={reduce ? undefined : item} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/#experience" variant="primary">
                Explore My Experience
              </Button>
              {profile.sections.resume && resumeExists && (
                <Button href={profile.resume.path} variant="secondary" external>
                  Download Resume
                </Button>
              )}
              <Button href={profile.socials.linkedin} variant="ghost" external icon={false}>
                <LinkedinIcon size={16} className="mr-1.5 -ml-1 inline" />
                LinkedIn
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.25rem] bg-accent-soft -z-10 rotate-2"
            />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-line shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/profile.jpg"
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 20rem"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
