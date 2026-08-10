"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const NAME = "Muhammad Ibrahim";
const ROLE = "Providing Real-World AI Solutions";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = e.currentTarget;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const r = 46;

    const mask = maskRef.current;
    if (mask) {
      const grad = `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 30%, #000 55%, transparent 72%)`;
      mask.style.maskImage = grad;
      (
        mask.style as CSSStyleDeclaration & { webkitMaskImage: string }
      ).webkitMaskImage = grad;
      mask.style.opacity = "1";
    }
    const ring = ringRef.current;
    if (ring) {
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.opacity = "1";
    }
  };

  const handleLeave = () => {
    if (maskRef.current) maskRef.current.style.opacity = "0";
    if (ringRef.current) ringRef.current.style.opacity = "0";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-wordmark]",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power2.out" }
      );
      tl.fromTo(
        "[data-photo]",
        { y: reduced ? 0 : 140, opacity: 0 },
        { y: 0, opacity: 1, duration: reduced ? 0.6 : 1.2, ease: reduced ? "power2.out" : "elastic.out(1, 0.7)" },
        "-=0.5"
      );
      tl.fromTo(
        "[data-scrollcue]",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      );

      if (reduced) tl.progress(1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-bg px-4 md:px-8"
    >
      <div className="relative flex w-full flex-col items-center gap-4 md:gap-6">
        {/* Name — centered on mobile, left-aligned with wordmark on desktop */}
        <span className="w-full text-center font-display text-lg font-semibold tracking-tight text-fg md:text-2xl md:text-left md:self-start">
          {NAME}
        </span>

        {/* Wordmark + portrait overlay */}
        <div className="relative w-full flex flex-col items-center">
          <h1
            data-wordmark
            aria-hidden
            className="pointer-events-none z-0 whitespace-nowrap text-center font-display font-bold leading-none text-white/[0.09]"
            style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)" }}
          >
            DEVELOPER
          </h1>

          {/* Photo centered over the wordmark */}
          <div
            data-photo
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative z-10 w-full flex justify-center pt-4 md:pt-8"
            style={{ maxWidth: "100%" }}
          >
            <div
              className="relative w-full max-w-[340px] aspect-[4/3] md:max-w-[400px] md:aspect-[1/1]"
            >
              <Image
                src="/images/profile.png"
                alt="Portrait"
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 340px"
                className="object-contain mix-blend-screen grayscale contrast-[1.05]"
              />
              <div
                ref={maskRef}
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300"
              >
                <Image
                  src="/images/profile.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 340px"
                  className="object-contain mix-blend-screen contrast-[1.05]"
                />
              </div>
              <div
                ref={ringRef}
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-24 w-24 rounded-full border border-white/40 opacity-0 shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-opacity duration-300 will-change-transform"
              />
            </div>
          </div>
        </div>

        {/* Role — centered on mobile, right-aligned on desktop */}
        <span className="w-full text-center font-display text-xs tracking-wide text-grey-2 md:text-sm md:text-right md:max-w-[40vw] md:self-end">
          {ROLE}
        </span>
      </div>

      <div
        data-scrollcue
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5 md:bottom-8"
      >
        <span className="h-2 w-1 animate-bounce rounded-full bg-grey-2" />
      </div>
    </section>
  );
}

function handleMove(e: React.MouseEvent<HTMLDivElement>) {
  const wrap = e.currentTarget;
  const rect = wrap.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const r = 46;

  const mask = maskRef.current;
  if (mask) {
    const grad = `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 30%, #000 55%, transparent 72%)`;
    mask.style.maskImage = grad;
    (
      mask.style as CSSStyleDeclaration & { webkitMaskImage: string }
    ).webkitMaskImage = grad;
    mask.style.opacity = "1";
  }
  const ring = ringRef.current;
  if (ring) {
    ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    ring.style.opacity = "1";
  }
}

function handleLeave() {
  if (maskRef.current) maskRef.current.style.opacity = "0";
  if (ringRef.current) ringRef.current.style.opacity = "0";
}

const maskRef = { current: null as HTMLDivElement | null };
const ringRef = { current: null as HTMLDivElement | null };