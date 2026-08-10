import { skills } from "@/lib/skills";
import { BrandMark } from "@/components/brand-mark";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-20 md:px-16 md:py-32">
      <p className="mb-4 text-xs tracking-[0.3em] text-grey-2 uppercase">
        Toolkit
      </p>
      <h2 className="mb-10 font-display text-4xl font-bold tracking-tight text-fg md:text-5xl lg:text-6xl">
        Skills
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {skills.map((s) => (
          <button
            key={s.name}
            type="button"
            className="skill-pill group relative grid h-14 md:h-16 place-items-center rounded-full border border-white/10 bg-grey-1 text-fg transition-[border-color,box-shadow,background-color,color] duration-300"
            style={{
              "--skill-bg": s.bg,
              "--skill-logo": s.logoColor,
            } as React.CSSProperties}
          >
            <span className="skill-label font-display text-xs font-semibold tracking-wide md:text-sm md:text-base">
              {s.name}
            </span>
            <span className="skill-logo text-white">
              <BrandMark name={s.name} size={20} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}