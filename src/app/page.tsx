import { Hero } from "@/components/hero";
import { WipeTransition } from "@/components/wipe-transition";
import { About } from "@/components/about";
import { StripCutter } from "@/components/strip-cutter";
import { ProjectsGallery } from "@/components/projects-gallery";
import { Skills } from "@/components/skills";
import { Testimonials } from "@/components/testimonials";
import { Connect } from "@/components/connect";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <WipeTransition>
        <About />
      </WipeTransition>
      <StripCutter />
      <ProjectsGallery />

      <Skills />

      <Testimonials />
      <Connect />
    </main>
  );
}