"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

interface TextOutlineProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Scroll-responsive text outline fill animation.
 * - Text starts as an outline (stroke only, transparent fill)
 * - As you scroll down, the fill expands from center outward
 * - As you scroll up, it reverses back to outline
 * - 1:1 scroll speed (scrub: true)
 */
export function TextOutline({
  children,
  className = "",
  as = "h2",
}: TextOutlineProps) {
  const reduced = usePrefersReducedMotion();
  const outlineRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { clipPath: "inset(0 50% 0 50%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  const Tag = as;

  if (reduced) {
    return (
      <div ref={containerRef} className="relative">
        <Tag ref={outlineRef as React.RefObject<HTMLParagraphElement>} className={`relative text-black ${className}`}>
          {children}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <Tag
        ref={outlineRef as React.RefObject<HTMLParagraphElement>}
        aria-hidden
        className={`relative -webkit-text-stroke-[1.5px] text-transparent ${className}`}
      >
        {children}
      </Tag>

      <Tag
        ref={fillRef as React.RefObject<HTMLParagraphElement>}
        className={`absolute inset-0 text-black pointer-events-none ${className}`}
        aria-hidden
      >
        {children}
      </Tag>
    </div>
  );
}