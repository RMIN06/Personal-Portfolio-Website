export type Skill = {
  name: string;
  /** Hover background color (the brand color). */
  bg: string;
  /** Color of the brand logo when shown on hover. */
  logoColor: string;
  /** simple-icons export key, used for the real brand mark. */
  icon: string;
};

export const skills: Skill[] = [
  { name: "React", bg: "#61dafb", logoColor: "#000000", icon: "siReact" },
  { name: "TypeScript", bg: "#3178c6", logoColor: "#ffffff", icon: "siTypescript" },
  { name: "Next.js", bg: "#ffffff", logoColor: "#000000", icon: "siNextdotjs" },
  { name: "Node.js", bg: "#5fa04e", logoColor: "#ffffff", icon: "siNodedotjs" },
  { name: "Tailwind", bg: "#06b6d4", logoColor: "#ffffff", icon: "siTailwindcss" },
  { name: "Three.js", bg: "#ffffff", logoColor: "#000000", icon: "siThreedotjs" },
  { name: "Python", bg: "#3776ab", logoColor: "#ffffff", icon: "siPython" },
  { name: "PostgreSQL", bg: "#4169e1", logoColor: "#ffffff", icon: "siPostgresql" },
  { name: "JavaScript", bg: "#f7df1e", logoColor: "#000000", icon: "siJavascript" },
  { name: "Figma", bg: "#f24e1e", logoColor: "#ffffff", icon: "siFigma" },
  { name: "HTML5", bg: "#e34f26", logoColor: "#ffffff", icon: "siHtml5" },
  { name: "CSS", bg: "#2972ff", logoColor: "#ffffff", icon: "siCss" },
];