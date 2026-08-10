"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero → About transition.
 *
 * A full-screen black panel sticks over the (white) About content. As the user
 * scrolls through a tall container the panel slowly glides upward, exposing
 * the About section top-down. The content itself never fades or translates —
 * only the covering panel moves — so nothing looks distorted mid-reveal.
 *
 * Meanwhile the About heading's .text-fill is driven from the SAME scroll
 * progress, so the text "fills up" while you keep scrolling (it has its own
 * dedicated phase after the panel has departed).
 */
export function WipeTransition({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      if (!panel) return;

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;

          // Slowly glide the black panel downward to uncover About.
          const uplift = gsap.utils.clamp(0, 1, (p - 0.02) / 0.55);
          panel.style.transform = `translateY(calc(${uplift * 100}% + ${
            1 - uplift
          }px))`;

          // Heading color-fill, mapped to the same scroll.
          const prog = gsap.utils.clamp(0, 1, (p - 0.18) / 0.5);
          const el = frameRef.current?.querySelector(".text-fill");
          if (el)
            (el as HTMLElement).style.backgroundPosition = `${
              (1 - prog) * 100
            }% 0%`;
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return <section id="about">{children}</section>;
  }

  return (
    <div
      id="about"
      ref={rootRef}
      className="relative"
      style={{ height: "160vh" }}
    >
      <div ref={frameRef} className="sticky top-0 h-screen overflow-hidden">
        {/* About white content, always fully rendered */}
        <div className="absolute inset-0 z-10 bg-fg">{children}</div>
        {/* Black curtain that glides away */}
        <div
          ref={panelRef}
          aria-hidden
          className="absolute inset-0 z-20 bg-bg will-change-transform"
        />
      </div>
    </div>
  );
}