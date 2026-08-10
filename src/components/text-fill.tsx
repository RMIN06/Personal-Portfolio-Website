"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-linked text "color-fill": the text shifts from invisible (white,
 * matching the white section) to filled black as the user scrolls. Only
 * black and white are used.
 */
export function TextFill({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { backgroundPosition: "100% 0%" },
        {
          backgroundPosition: "0% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <h2
      ref={ref}
      className={`text-fill font-display font-bold tracking-tight ${
        reduced ? "text-black" : ""
      }`}
    >
      {children}
    </h2>
  );
}