"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-[88%] w-[82vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-grey-1 text-fg shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] sm:w-[46vw] md:w-[40vw] lg:w-[30vw] xl:w-[26vw]"
    >
      <Link href={`/projects/${project.slug}`} className="flex min-h-0 flex-1 flex-col">
        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          style={{
            background: `radial-gradient(120% 120% at 18% 0%, ${project.accent}26, transparent 55%), linear-gradient(160deg, ${project.accent}3a, #101010 75%)`,
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-10 select-none font-display font-black uppercase leading-none text-white/[0.06] transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"
            style={{ fontSize: "clamp(5rem, 16vw, 11rem)" }}
          >
            {project.title.slice(0, 1)}
          </span>
          <span
            className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest"
            style={{
              color: project.accent,
              background: "rgba(0,0,0,0.55)",
              boxShadow: `inset 0 0 0 1px ${project.accent}44`,
            }}
          >
            {project.tagline}
          </span>
        </div>

        <div className="flex shrink-0 items-end justify-between gap-4 p-6">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-grey-2">
              {project.summary}
            </p>
          </div>
          <span className="shrink-0 font-display text-xs text-grey-2">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectsGallery() {
  const sceneRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sceneRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const getTravel = () => {
        const spacer = track.lastElementChild as HTMLElement | null;
        if (!spacer) return 0;
        const spacerRect = spacer.getBoundingClientRect();
        return Math.max(spacerRect.right - document.documentElement.clientWidth, 0);
      };

      if (!isMobile) {
        // Desktop: horizontal scroll
        gsap.to(track, {
          x: () => -getTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getTravel() * 2,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      } else {
        // Mobile: vertical scroll, just animate cards in
        gsap.fromTo(
          track.querySelectorAll(".project-card"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative overflow-hidden bg-bg text-fg"
    >
      <div className="shrink-0 px-6 pt-16 pb-8 md:px-16 md:pt-20 md:pb-2">
        <p className="mb-4 text-xs tracking-[0.3em] text-grey-2 uppercase">
          Selected Work
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Projects
        </h2>
      </div>

      <div
        ref={trackRef}
        className="relative"
        style={{ minWidth: "max-content" }}
      >
        {isMobile ? (
          // Mobile: vertical stack
          <div className="flex flex-col items-center gap-8 px-6 pb-16">
            {projects.map((p) => (
              <div key={p.slug} className="project-card w-full max-w-xl">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        ) : (
          // Desktop: horizontal scroll
          <div
            ref={trackRef}
            className="flex flex-1 flex-nowrap items-center gap-6 overflow-hidden will-change-transform pl-[6vw]"
            style={{ height: "calc(100vh - 14rem)", minWidth: "max-content" }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
            <div className="w-[30vw] shrink-0" />
          </div>
        )}
      </div>
    </section>
  );
}