"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

const TILES = 7;
const COPIES = 4;

function bandTiles() {
  return Array.from({ length: TILES }).map((_, i) => (
    <span
      key={i}
      aria-hidden
      className="flex items-center gap-[0.3em] px-[0.45em]"
    >
      {Array.from({ length: COPIES }).map((_, j) => (
        <span key={j} className="px-[0.12em]">
          PROJECTS
        </span>
      ))}
    </span>
  ));
}

export function StripCutter() {
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", () => setIsMobile(window.innerWidth < 768));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || isMobile) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      });

      root.querySelectorAll<HTMLElement>("[data-hmarq]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 0 },
          { xPercent: -100 / TILES, ease: "none", scrollTrigger: st }
        );
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [reduced, isMobile]);

  const SIZE = "clamp(2rem, 5vw, 4rem)";

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-fg"
      style={{ height: isMobile ? "60vh" : "105vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Strip A */}
          <div
            data-band-a
            className="absolute h-[16vh] w-[170vw] overflow-hidden bg-bg rotate-[14deg] will-change-transform"
            style={{ display: isMobile ? "none" : "block" }}
          >
            <div
              data-hmarq
              className="flex w-max items-center whitespace-nowrap font-display font-black uppercase leading-none tracking-[0.12em] text-fg will-change-transform"
              style={{ fontSize: SIZE }}
            >
              {bandTiles()}
            </div>
          </div>
          {/* Strip B — the reverse diagonal, together forming an X */}
          <div
            data-band-b
            className="absolute h-[16vh] w-[170vw] overflow-hidden bg-bg -rotate-[14deg] will-change-transform"
            style={{ display: isMobile ? "none" : "block" }}
          >
            <div
              data-hmarq
              className="flex w-max items-center whitespace-nowrap font-display font-black uppercase leading-none tracking-[0.12em] text-fg will-change-transform"
              style={{ fontSize: SIZE }}
            >
              {bandTiles()}
            </div>
          </div>

          {/* Mobile fallback: simple centered text */}
          {isMobile && (
            <div className="flex flex-col items-center justify-center gap-4 text-center px-4">
              <div className="w-full overflow-hidden">
                <div className="flex whitespace-nowrap animate-[scroll_20s_linear_infinite]">
                  {bandTiles()}
                  {bandTiles()}
                </div>
              </div>
              <p className="text-xs text-grey-2 uppercase tracking-[0.3em]">Projects</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}