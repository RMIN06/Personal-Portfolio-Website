"use client";

import dynamic from "next/dynamic";
import { TextOutline } from "@/components/text-outline";

const TechObject = dynamic(
  () => import("@/components/tech-object").then((m) => m.TechObject),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-grey-1" />
    ),
  }
);

export function About() {
  return (
    <section
      className="relative min-h-screen flex flex-col md:grid md:grid-cols-2 md:min-h-screen bg-fg text-bg"
    >
      {/* Left: intro + scroll-responsive outline heading */}
      <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-0">
        <p className="mb-4 text-xs tracking-[0.3em] text-black/50 uppercase">
          About
        </p>
        <TextOutline className="font-display font-bold tracking-tight text-[clamp(2.5rem,8vw,5rem)] leading-[1.05]">
          Dev who ships
          <br />
          with restraint.
        </TextOutline>
        <p className="mt-6 max-w-lg text-base leading-8 text-black/70 md:text-lg md:leading-9">
          A short, scannable introduction goes here — what you do, what you
          care about, and the kind of work you want to do next. Keep it
          minimal. Let the whitespace do the talking.
        </p>
      </div>

      {/* Right: realistic 3D tech object */}
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-8 md:px-8 md:py-0">
        <div className="h-full w-full max-w-[520px]">
          <TechObject />
        </div>
      </div>
    </section>
  );
}