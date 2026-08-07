"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Container from "./ui/Container";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/config/profile";
import { openAskSahil } from "@/lib/ask-sahil-events";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Art", href: "/art" },
  { label: "Resume", href: "/#resume", show: profile.sections.resume },
  { label: "Contact", href: "/#contact" },
].filter((item) => item.show !== false);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = NAV_ITEMS.filter((i) => i.href.startsWith("/#")).map((i) =>
      i.href.replace("/#", "")
    );
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`/#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/art" ? pathname === "/art" : pathname === "/" && activeHash === href;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-3" : "py-6"
          }`}
          aria-label="Primary"
        >
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-lg font-medium tracking-tight text-ink hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.png"
              alt={`${profile.name} logo`}
              width={217}
              height={248}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <span className="hidden sm:inline text-ink font-sans text-lg font-medium">
              {profile.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`underline-fade text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-accent" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {profile.sections.askSahil && (
              <button
                type="button"
                onClick={openAskSahil}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft text-accent text-sm font-medium px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-6px_var(--color-accent)]"
              >
                <Sparkles size={14} />
                Ask Sahil
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex items-center justify-center rounded-full border border-line h-9 w-9 text-ink"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-paper border-b border-line"
          >
            <Container className="py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 text-base font-medium border-b border-line/60 last:border-0 ${
                    isActive(item.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {profile.sections.askSahil && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openAskSahil();
                  }}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent text-paper text-sm font-medium px-4 py-3"
                >
                  <Sparkles size={14} />
                  Ask Sahil
                </button>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
