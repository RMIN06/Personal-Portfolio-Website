"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/media";

type Props = {
  src: string;
  alt: string;
  radius?: number;
  className?: string;
};

/**
 * Grayscale image by default; a circular "porthole" reveals the color
 * version exactly where the cursor is, via clip-path.
 * On touch / reduced-motion devices the full color image is shown instead.
 */
export function ColorRevealImage({
  src,
  alt,
  radius = 96,
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLImageElement>(null);
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const compact = !finePointer || reduced;

  const onMove = useCallback(
    (e: MouseEvent) => {
      const wrap = wrapRef.current;
      const reveal = revealRef.current;
      if (!wrap || !reveal || compact) return;
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      reveal.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
    },
    [radius, compact]
  );

  useEffect(() => {
    if (compact) return;
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove, compact]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        style={{
          filter: compact ? "none" : "grayscale(100%) contrast(1.05)",
          transition: "filter 0.3s ease",
        }}
        className="object-cover"
        priority
      />
      {!compact && (
        <Image
          ref={revealRef}
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          style={{ clipPath: "circle(0px at 50% 50%)" }}
          className="object-cover"
          aria-hidden
        />
      )}
    </div>
  );
}