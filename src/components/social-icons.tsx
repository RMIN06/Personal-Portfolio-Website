type IconDef = {
  brand: string;
  path: React.ReactNode;
};

export const socials: Record<string, IconDef> = {
  whatsapp: {
    brand: "#25d366",
    path: (
      <>
        <path d="M20 11.8a7.8 7.8 0 1 1-2.2-5.5l1.6-1.6.3 3.1 3.1.3-2 1.9a7.8 7.8 0 0 1-.4 1.8z" />
        <path d="M9.4 9.2c1.2-1.2 2.6-2.2 4.3-3 .3.9.6 1.9.6 2.1-.1.2-.9.8-1.3.8.5 1.4 1.4 2.3 2.9 2.3.5 0 1.3-.6 1.6-.6-.1.6-.3 1.9-.5 2.3" fill="currentColor" stroke="none" />
      </>
    ),
  },
  linkedin: {
    brand: "#0a66c2",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v6M8 7.5v.1M12 16v-3.5a2 2 0 0 1 4 0V16M16 11.5V16" />
      </>
    ),
  },
  github: {
    brand: "#ffffff",
    path: (
      <path d="M15 21v-3a3.5 3.5 0 0 0-1-2.7c3-.4 6-1.5 6-5.5A4 4 0 0 0 19 6a3.8 3.8 0 0 0-.2-3s-1.2-.4-3.8 1.4a12 12 0 0 0-7 0C5.4 2.6 4.2 3 4.2 3A3.8 3.8 0 0 0 4 6a4 4 0 0 0-1 3.3c0 4 3 5.1 6 5.5a3.5 3.5 0 0 0-1 2.7v3" />
    ),
  },
  instagram: {
    brand: "#e1306c",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
  facebook: {
    brand: "#1877f2",
    path: (
      <path d="M14 8.5V6.8c0-.9.6-1.3 1.3-1.3H17V3h-2.3C12 3 11 5 11 6.7v1.8H9v2.8h2V21h3v-9.7h2l.3-2.8h-2.3z" />
    ),
  },
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const def = socials[name];
  if (!def) return null;
  return (
    <svg {...base} aria-hidden className={className}>
      {def.path}
    </svg>
  );
}