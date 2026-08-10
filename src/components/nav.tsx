"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll";

const LINKS = [
  { label: "Home", target: "#hero" },
  { label: "About", target: "#about" },
  { label: "Projects", target: "#projects" },
  { label: "Skills", target: "#skills" },
  { label: "Testimonials", target: "#testimonials" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 40;
      setScrolled(past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: string) => {
    setOpen(false);
    scrollToSection(target);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "max-w-4xl scale-[0.98]" : "max-w-xl"
        }`}
      >
        <span className="px-2 font-display text-lg font-bold tracking-tight text-fg">
          YD<span className="text-accent">.</span>
        </span>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => go(link.target)}
                className="rounded-full px-3 py-1.5 text-sm text-grey-2 transition-colors hover:text-fg focus-visible:text-fg"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="/cv.pdf"
          download
          onClick={() => setOpen(false)}
          className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
        >
          Download CV
        </a>

        <button
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {open ? (
              <path d="M6 6l8 8M14 6l-8 8" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h8" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="absolute top-16 w-[calc(100%-2rem)] rounded-3xl border border-white/10 bg-black/60 p-2 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => go(link.target)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-grey-2 transition-colors hover:bg-white/5 hover:text-fg"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}