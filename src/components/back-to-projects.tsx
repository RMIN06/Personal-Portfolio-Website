"use client";

import { useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

/**
 * Returns to the home route and gently scrolls back to the Projects
 * gallery (approximating resume-at-same-horizontal-position).
 */
export function BackToProjects() {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
    setTimeout(() => scrollToSection("#projects"), 350);
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm text-grey-2 transition-colors hover:text-fg"
    >
      <span aria-hidden>←</span> Back to projects
    </button>
  );
}