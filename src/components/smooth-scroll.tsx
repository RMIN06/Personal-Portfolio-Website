"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth-scroll and drives the GSAP ScrollTrigger refresh
 * loop so scroll-linked animations stay in sync with the eased scroll.
 * Disables smooth scroll on mobile for better performance.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const initLenis = () => {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      lenis.scrollTo(0, { immediate: true });
    };

    if (window.innerWidth >= 768) {
      initLenis();
    }

    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (nowMobile && lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenis(null);
        gsap.ticker.lagSmoothing(0);
      } else if (!nowMobile && !lenisRef.current) {
        initLenis();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenis(null);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
}