# Personal Portfolio Website

A single-page, scroll-driven developer portfolio built to feel less like a "website" and more like a short interactive film. Every scroll transitions between full scenes rather than static sections, with a monochrome (black/white/greyscale) visual language where color only ever appears as a *reward* — on cursor hover, active states, and skill interactions.

**Live demo:** [personal-portfolio-website-self-gamma.vercel.app](https://personal-portfolio-website-self-gamma.vercel.app)

---

## Design Philosophy

- **Restraint is the differentiator** — minimal text, maximum motion-with-purpose. Animation only exists if it communicates something (location, next action, context).
- **Color as reward** — the site renders in greyscale by default; color is revealed only through interaction (cursor proximity, hover, focus).
- **Cinematic transitions** — full-bleed scene changes instead of generic fade/slide-up card reveals.

---

## Key Features

- **Cursor "colorization"** — a lerped circular cursor-follower reveals color in grayscale content wherever it hovers, implemented via CSS `clip-path` masking (with an optional WebGL shader path for a softer falloff).
- **3D hanging ID card** — a React Three Fiber scene renders a card suspended on a simulated lanyard with idle pendulum sway and mouse-parallax tilt, replacing a static headshot.
- **"Black Wipe" transition** — a pinned GSAP ScrollTrigger timeline drives a full-viewport black panel with a clip-path mask reveal between the Hero and About sections.
- **"Strip Cutter" interstitial** — scroll-velocity-linked marquee strips act as a full transitional section between About and Projects.
- **Horizontal-scroll project gallery** — vertical page scroll is translated into horizontal project card movement, with animated glow-stroke hovers and shared-element (Framer Motion `layoutId`) transitions into dedicated project detail pages.
- **Data-driven skills grid** — skill buttons crossfade from label to brand logo on hover, with a brand-colored glow, without any layout shift.
- **Testimonials placeholder** — an intentional "coming soon" teaser styled consistently with the rest of the site.
- **Connect/footer section** — animated social icons (WhatsApp, LinkedIn, GitHub, Instagram, Facebook) and a minimal contact form.
- **Accessibility-first motion** — every custom transition respects `prefers-reduced-motion` with a simple-fade fallback, and all interactive elements have keyboard focus states.
- **Static, versioned CV download** — served directly from `/public`, no backend required.

---

## Tech Stack

| Layer | Choice | Purpose |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) | Routing per project page, SSR/SSG, image optimization |
| 3D | [Three.js](https://threejs.org) via [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei) | Declarative 3D composed with React state/scroll |
| Scroll & Animation | [GSAP](https://gsap.com) (ScrollTrigger) + [Lenis](https://lenis.darkroom.engineering) | Scroll-linked animation timing and smooth-scroll normalization |
| Micro-interactions | [Framer Motion](https://www.framer.com/motion) | Hover states, button morphs, route transitions |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 + CSS variables | Utility styling with enforced monochrome design tokens |
| Icons | [simple-icons](https://simpleicons.org) | Brand logos for the skills grid and social links |
| Language | TypeScript | Type safety across the app |
| Hosting | [Vercel](https://vercel.com) | Native Next.js support, edge caching for animation-heavy assets |

**Runtime versions used in this project:** Next.js 16.3, React 19.2, Three.js 0.185, GSAP 3.15.

---

## Repository Structure

```
.
├── public/                    # Static assets (images, CV PDF, etc.)
├── scripts/                   # Build/utility scripts
├── src/                       # Application source (routes, components, 3D scenes)
├── AGENTS.md                  # Notes/instructions for AI coding agents working in this repo
├── CLAUDE.md                  # Claude-specific project instructions
├── Portfolio_Website_PRD.md   # Full product requirements document
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS configuration (Tailwind)
├── package.json                # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js (a version compatible with Next.js 16 and React 19)
- npm, yarn, pnpm, or bun

### Step 1 — Clone the repository

```bash
git clone https://github.com/RMIN06/Personal-Portfolio-Website.git
cd Personal-Portfolio-Website
```

### Step 2 — Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Step 3 — Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Step 4 — Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates as you edit files under `src/`.

### Step 5 — Lint the project (optional, before committing)

```bash
npm run lint
```

### Step 6 — Build for production

```bash
npm run build
```

### Step 7 — Start the production server locally

```bash
npm run start
```

### Step 8 — Deploy

The project is configured for deployment on [Vercel](https://vercel.com/new). Connect the repository to a Vercel project and pushes to `master` will trigger a build and deploy automatically. Any Next.js-compatible host can be used instead by running `npm run build` followed by `npm run start`.

---

## Build Phases (as designed in the PRD)

The site was planned to be built in the following incremental phases:

1. **Foundation** — Next.js scaffold, design tokens, typography, Lenis smooth scroll setup, static glass navigation shell.
2. **Hero + cursor system** — photo entrance animation, large wordmark type, cursor colorization proof-of-concept on the hero photo.
3. **Hero → About transition + About section** — black-wipe transition, 3D hanging card (starting as a static textured plane before adding sway physics), paragraph layout.
4. **Strip-cutter transition** — the marquee interstitial between About and Projects.
5. **Projects** — horizontal-scroll gallery, hover glow, project data model, dynamic `[slug]` routes, and shared-element transitions.
6. **Skills grid** — data-driven logo/color hover system.
7. **Testimonials placeholder + Connect/footer** — social buttons, email form, closing hero-style heading.
8. **Polish pass** — reduced-motion fallbacks, mobile behavior for every custom interaction, performance audit, Lighthouse pass, CV download wiring, and deployment to Vercel.

See [`Portfolio_Website_PRD.md`](./Portfolio_Website_PRD.md) for the complete specification, including section-by-section behavior, motion inventory, and non-functional requirements.

---

## Performance & Accessibility Targets

- Lighthouse Performance score ≥ 85 on desktop despite the animation-heavy stack.
- LCP < 3s on a throttled 4G profile.
- The Three.js/R3F bundle is lazy-loaded only when the About section nears the viewport.
- All custom transitions honor `prefers-reduced-motion` and fall back to simple fades.
- Keyboard focus states are defined for the navigation, buttons, skills grid, and social icons.

---

## License

No license has been specified for this repository. All rights are reserved by the author; the code may not be reused, copied, or redistributed without explicit permission.
