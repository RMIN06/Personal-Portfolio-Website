import {
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siTailwindcss,
  siThreedotjs,
  siPython,
  siPostgresql,
  siJavascript,
  siFigma,
  siHtml5,
  siCss,
  type SimpleIcon,
} from "simple-icons";
import { skills, type Skill } from "@/lib/skills";

const registry: Record<string, SimpleIcon> = {
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siTailwindcss,
  siThreedotjs,
  siPython,
  siPostgresql,
  siJavascript,
  siFigma,
  siHtml5,
  siCss,
};

export function BrandMark({ name, size = 24 }: { name: Skill["name"]; size?: number }) {
  const skill = skills.find((s) => s.name === name);
  if (!skill) return null;
  const icon = registry[skill.icon];
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={icon.title}
      style={{ width: size, height: size, fill: "currentColor" }}
    >
      <path d={icon.path} />
    </svg>
  );
}