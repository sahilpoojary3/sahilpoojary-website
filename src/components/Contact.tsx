"use client";

import { useState } from "react";
import { Copy, Check, Mail, FileText } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import LinkedinIcon from "./ui/LinkedinIcon";
import { profile } from "@/config/profile";
import { useFileExists } from "@/lib/useFileExists";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const resumeExists = useFileExists(profile.resume.path);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op, mailto link still works.
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-paper-soft/60">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Let&apos;s Connect
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink">
              Hiring, collaborating, or just want to say hello?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
              Whether you&apos;re hiring, collaborating, or simply want to connect, I&apos;d be happy to
              hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href={`mailto:${profile.email}`} variant="primary" icon={false}>
                <Mail size={16} className="mr-1.5 -ml-1 inline" />
                Email Me
              </Button>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                {copied ? "Email copied ✓" : "Copy Email"}
              </button>
              <Button href={profile.socials.linkedin} variant="secondary" external icon={false}>
                <LinkedinIcon size={16} className="mr-1.5 -ml-1 inline" />
                LinkedIn
              </Button>
              {profile.sections.resume && resumeExists && (
                <Button href={profile.resume.path} variant="ghost" external icon={false}>
                  <FileText size={16} className="mr-1.5 -ml-1 inline" />
                  Resume
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
