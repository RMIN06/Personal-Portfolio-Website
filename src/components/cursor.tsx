"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/media";

/**
 * Lerped circular cursor follower. Hides the native cursor only on
 * fine-pointer devices that respect motion, so touch users are unaffected.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = finePointer && !reduced;

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("custom-cursor");

    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let px = x;
    let py = y;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    dot.style.opacity = "1";

    const loop = () => {
      px += (x - px) * 0.2;
      py += (y - py) * 0.2;
      dot.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(
        2
      )}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [active]);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] h-6 w-6 rounded-full"
      style={{
        mixBlendMode: "difference",
        background: "#ffffff",
        opacity: 0,
      }}
    />
  );
}