"use client";

import { FileText } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import { profile } from "@/config/profile";
import { useFileExists } from "@/lib/useFileExists";

export default function Resume() {
  const exists = useFileExists(profile.resume.path);

  return (
    <section id="resume" className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading eyebrow="Resume" title="My Resume" align="center" />

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-line bg-paper-soft/60 p-10 flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent mb-5">
                <FileText size={22} />
              </span>

              {exists === null && (
                <p className="text-sm text-ink-soft">Checking for the latest resume…</p>
              )}

              {exists === false && (
                <p className="text-sm text-ink-soft max-w-xs">
                  A downloadable resume will be available here shortly — in the meantime, feel free
                  to get in touch directly or connect on LinkedIn.
                </p>
              )}

              {exists && (
                <>
                  <p className="text-sm text-ink-soft mb-6">
                    A concise, up-to-date summary of experience, education and skills.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button href={profile.resume.path} variant="primary" external icon={false}>
                      View Resume
                    </Button>
                    <a
                      href={profile.resume.path}
                      download
                      className="group inline-flex items-center gap-2 rounded-full text-sm font-medium border border-line px-6 py-3 text-ink hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Download Resume
                    </a>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
