import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { BackToProjects } from "@/components/back-to-projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — Projects`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="relative min-h-screen px-6 pt-28 pb-20 md:px-16">
      <BackToProjects />

      <div className="mx-auto mt-10 max-w-5xl">
        <p
          className="mb-4 text-xs font-medium tracking-[0.3em] uppercase"
          style={{ color: project.accent }}
        >
          {project.tagline} · {project.year}
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-bold tracking-tight md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-grey-2">
          {project.summary}
        </p>

        <div
          className="mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10"
          style={{
            background: `radial-gradient(120% 120% at 20% 10%, ${project.accent}22, transparent 60%), linear-gradient(160deg, ${project.accent}55, #111 70%)`,
          }}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          <section className="md:col-span-2">
            <h2 className="mb-4 font-display text-2xl font-bold">
              The Problem
            </h2>
            <p className="text-grey-2">{project.problem}</p>

            <h2 className="mt-10 mb-4 font-display text-2xl font-bold">
              The Solution
            </h2>
            <p className="text-grey-2">{project.solution}</p>
          </section>

          <aside className="space-y-8">
            <div>
              <h3 className="mb-3 text-xs tracking-[0.3em] text-grey-2 uppercase">
                Role
              </h3>
              <p className="text-lg">{project.role}</p>
            </div>
            <div>
              <h3 className="mb-3 text-xs tracking-[0.3em] text-grey-2 uppercase">
                Stack
              </h3>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-grey-2"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-fg px-5 py-2.5 text-center text-sm font-medium text-bg transition-colors hover:bg-accent"
                >
                  View live site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-5 py-2.5 text-center text-sm text-grey-2 transition-colors hover:border-white/40 hover:text-fg"
                >
                  View code
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}