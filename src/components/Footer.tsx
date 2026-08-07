"use client";

import Container from "./ui/Container";
import { profile } from "@/config/profile";
import { Mail, FileText } from "lucide-react";
import LinkedinIcon from "./ui/LinkedinIcon";
import { useFileExists } from "@/lib/useFileExists";

export default function Footer() {
  const resumeExists = useFileExists(profile.resume.path);

  return (
    <footer className="border-t border-line mt-24">
      <Container className="py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg text-ink">{profile.name}</p>
          <p className="text-sm text-ink-soft mt-1">Business & Management Professional</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink-soft hover:text-accent transition-colors duration-200"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-ink-soft hover:text-accent transition-colors duration-200"
          >
            <Mail size={18} />
          </a>
          {profile.sections.resume && resumeExists && (
            <a
              href={profile.resume.path}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="text-ink-soft hover:text-accent transition-colors duration-200"
            >
              <FileText size={18} />
            </a>
          )}
        </div>

        <p className="text-xs text-ink-soft/80">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
