# Product Requirements Document
## Personal Developer Portfolio Website

**Version:** 1.0
**Prepared for:** Build via OpenCode
**Doc Owner:** You (Developer/Product Owner)

---

## 1. Vision & Positioning

A single-page, scroll-driven portfolio experience that behaves less like a "website" and more like a **short interactive film**. Every scroll is a scene change, not a section change. The visual language is monochrome (black, white, greyscale) with color used as a *reward* — it only appears where the user's attention is (cursor hover, active states), never as decoration.

**Design principle to enforce everywhere:** *Restraint is the differentiator.* Minimal text, maximum motion-with-purpose. If an animation doesn't tell the user something (where they are, what to do next, what this thing is), cut it.

**What makes this different from a template portfolio:**
- Full-bleed cinematic transitions between sections (not fade/slide-up card reveals)
- A cursor that "colorizes" the world instead of just changing shape
- A 3D hanging ID-card object instead of a static headshot
- A "strip cutter" transition as an interstitial, not just a section
- Each project is a real route/page, not a modal or accordion
- Skills that *become* their own logos on hover, rather than static icon grids

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Routing per project page, SSR/SSG for SEO, image optimization |
| 3D | **Three.js via React Three Fiber (R3F) + drei** | Declarative 3D that composes with React state/scroll |
| Scroll & Animation | **GSAP (ScrollTrigger) + Lenis (smooth scroll)** | Best-in-class scroll-linked animation timing; Lenis normalizes scroll for buttery transitions |
| Micro-interactions | **Framer Motion** | Hover states, button morphs, page-route transitions |
| Styling | **Tailwind CSS + CSS variables** | Fast utility styling, easy to enforce monochrome design tokens |
| Cursor colorization | **Custom WebGL shader (via R3F) or CSS `mix-blend-mode` + clip-path** | See Section 8 for two implementation paths |
| CMS/content | **MDX or local JSON/TS data file** | Project data, skills data — keeps content editable without touching layout code |
| Hosting | **Vercel** | Native Next.js support, edge caching for animation-heavy assets |
| CV delivery | Static PDF in `/public`, downloaded via `<a download>` | Simple, no backend needed |
| Contact | **Resend / EmailJS / Formspree** (pick one) | Serverless email from the contact section, no backend required |

**Performance guardrails (non-negotiable given the animation load):**
- Lazy-load the 3D card model and Three.js bundle only when About section is near viewport (`next/dynamic` + intersection observer)
- Compress/hash all project media, use `next/image`
- Target Lighthouse Performance ≥ 85 on desktop despite the heavy stack
- Respect `prefers-reduced-motion`: provide a reduced-motion fallback for every custom transition (simple fades) — this is also an accessibility requirement, not optional

---

## 3. Global Design Tokens

- **Colors:** `--bg: #000000`, `--fg: #ffffff`, `--grey-1: #1a1a1a`, `--grey-2: #808080`, accent color(s) used ONLY inside hover/cursor-reveal states — pick 1 accent max (e.g. one saturated color) so "color appearing" feels intentional, not decorative
- **Typography:** One display typeface for large bold headings (e.g. a grotesk/condensed sans — Neue Montreal, General Sans, or similar variable font), one body font for paragraphs. Headings are set large, bold, tight letter-spacing. Body copy stays small, high line-height, generous margins — the professional "breathing room" you asked for.
- **Spacing scale:** 8px base grid, generous section padding (min 120px vertical on desktop) so each section reads as its own "page"
- **Motion easing:** standardize on 2–3 custom cubic-bezier easings (no default `ease-in-out` everywhere) so the whole site feels like it has one signature motion identity

---

## 4. Site Map / Information Architecture

Single scrollable home route `/` containing: Hero → About → (strip transition) → Projects → Skills → Testimonials → Connect/Footer.

Additional real routes:
- `/projects/[slug]` — dedicated page per project
- (Optional) `/about` deep-link anchor for nav

Nav bar is present globally (glass, fixed) and its own state (background, contrast) changes per section — see Section 5.

---

## 5. Section-by-Section Specification

### 5.1 Navigation Bar
- **Style:** glassmorphic (frosted glass) — `backdrop-filter: blur(20px)`, translucent black background (~10–15% opacity white overlay on black), subtle 1px border with low-opacity white, soft inner highlight — modeled on the latest iOS "Liquid Glass" style: rounded pill/capsule container, floats with margin from the top edge (not full-bleed), slight scale/blur intensification on scroll.
- **Items:** Home, About, Projects, Skills, Testimonials, **Download CV** (styled as a distinct filled button, not a text link, since it's an action not a nav target)
- **Scroll behavior:** bar should react per section — e.g., blur intensity and border contrast subtly shift as the background behind it changes (project section vs. dark hero) so it never loses legibility. Bar shrinks slightly (height reduction) after the user scrolls past the hero.
- **Mobile:** collapses to a glass hamburger; CV button remains visible/prioritized.

### 5.2 Hero Section
- Full-viewport, black background.
- Sequence on load: your photo animates in from bottom → settles centered/mid-viewport (spring-based ease, not linear).
- Large bold "DEVELOPER" wordmark animates in and sits **behind** the photo (z-index below), large enough to bleed near the viewport edges — you become the visual "cutout" over the type.
- Minimal supporting copy: name + one-line role/value statement only (no paragraph). A scroll-cue indicator (small, subtle — e.g. animated line or chevron) at the bottom signals "scroll to explore."
- No nav distraction — bar is present but understated here (max glass transparency).

### 5.3 Hero → About Transition ("Black Wipe")
- On scroll intent, a full-viewport black panel animates up from the bottom (or in from a diagonal/mask-reveal, not a plain slide) and completely covers the hero.
- While covered, the About section content mounts underneath.
- Panel then reveals About using a **non-standard wipe**: recommend a **clip-path mask reveal** (e.g., an expanding circle from the cursor's last position, or a diagonal/angled wipe) rather than a simple opacity fade or top-to-bottom slide — this satisfies "not the generic one everyone uses."
- Implementation: GSAP ScrollTrigger `scrub` timeline driving the clip-path/transform of the black panel, pinned during the transition so it feels authored, not passively triggered.

### 5.4 About Section
- Two-column layout (desktop): left = paragraph about you (short, scannable, generous line-height); right = **3D hanging card**.
- **3D card object:** R3F scene — a card mesh with your photo as a texture, suspended from a lanyard/string (simple cylinder or spline-based curve mesh simulating a strap), subtle physics-like sway (use a lightweight spring/pendulum simulation, not a full physics engine, for performance) — reacts gently to mouse movement (parallax tilt).
- On scroll into section, the card animates in — "pops out" and settles into its hang, entering from the top edge as if dropped into place, then continues a slow idle sway loop.
- Mobile: 3D card can render as a lighter-weight canvas or a pre-rendered animated fallback if performance requires it — decide during build based on device testing.

### 5.5 About → Projects Transition ("Strip Cutter")
- A set of horizontal strips (e.g. 4–6) animate across the viewport at slightly different speeds/angles, each strip repeating the word **"projects"** (5×, tracked/spaced type) marquee-scrolling horizontally.
- As user scrolls, each strip's marquee text scrolls off one edge and re-enters from the opposite edge (infinite loop, scroll-position-driven, not time-based — velocity tied to scroll speed so it feels interactive, not just autoplaying).
- Strips can be set at slight rotation / overlapping z-depth so they visually "cut" across each other.
- This section acts as a full interstitial — pinned briefly via ScrollTrigger so the user register it as a transition/statement before entering the gallery.

### 5.6 Projects Section
- **Horizontal scroll gallery**: vertical page-scroll is translated into horizontal project-card movement (classic GSAP ScrollTrigger horizontal-pin pattern), so projects "emerge" left-to-right as the user scrolls down.
- Each project card: image/video preview, project name, 1-line tag (e.g. stack or category). Monochrome by default; **on hover**, a glow/light line traces the card edge (animated SVG stroke or box-shadow animation) — this is the one place besides cursor-hover where light/color is allowed to appear.
- **On click:** smooth transition (shared-element style, e.g. Framer Motion `layoutId`) into `/projects/[slug]` — the clicked card visually expands/morphs into the new page's hero image rather than a hard route cut.
- **Project detail page** (`/projects/[slug]`): dedicated page per project — problem, role, stack, gallery, links (live/GitHub), and a "back to projects" affordance that returns to the same horizontal-scroll position.

### 5.7 Skills Section
- Grid: **3 buttons per row**, consistent gap between rows/groups (your "space" requirement) — use CSS grid, not flex-wrap, for consistent rhythm.
- Default state: monochrome pill/button with skill name only (e.g. "Node.js").
- **Hover state:** button morphs — text/label transitions to (or is replaced by) the skill's actual brand logo, and a soft colored glow (using that skill's brand color) appears behind/around the button. Implement via a small logo asset set (SVGs) + CSS custom property per-skill for the glow color, driven by a data array (`{ name, logo, color }`) so adding skills later is trivial.
- Transition: crossfade + scale (button shouldn't "jump" in size) — keep layout stable so the grid doesn't reflow on hover.

### 5.8 Testimonials Section
- Placeholder state: large heading (e.g. "Testimonials") + "Coming soon" sub-line, styled consistently with the rest (bold, minimal), sized to not feel like a broken/empty section — treat it as an intentional teaser, not a gap.

### 5.9 Connect / Footer
- Large bold **"Let's Connect"** statement heading, full-width, generous vertical space before it (acts like its own mini hero).
- Social icon buttons: WhatsApp, LinkedIn, GitHub, Instagram, Facebook — monochrome line icons by default, each icon animates black-and-white → brand color on hover (consistent with global button hover rule).
- Email/contact block: either a styled `mailto:` button or a minimal inline form (name/email/message) wired to your chosen email service (Resend/EmailJS/Formspree) — recommend a minimal form over a raw `mailto:` for conversion, but keep it to 2–3 fields max to match the "minimal" ethos.
- Footer close: small print row (copyright, maybe a "back to top" control).

---

## 6. Custom Cursor & "Colorization" Interaction

**Behavior:** A small circular cursor-follower persists on screen at all times (lags slightly behind the real cursor via lerp/easing for a smooth "trailing" feel — not 1:1 rigid tracking). Content under/near the circle reveals color; content outside it stays black & white.

**Recommended implementation (two viable paths — pick based on build complexity tolerance):**

1. **CSS mask/clip-path approach (simpler, performant):**
   - Render the color version of an image/section absolutely positioned on top of its grayscale (`filter: grayscale(100%)`) counterpart.
   - The color layer's `clip-path: circle(60px at {cursorX}px {cursorY}px)` is updated on `mousemove` (throttled via `requestAnimationFrame`), so only the circular region of the color layer is visible, revealing color exactly where the cursor is.
   - Works well for the hero photo and any other single "spotlight" hover-to-color moments.

2. **WebGL shader approach (richer, more expensive):**
   - A fragment shader samples a grayscale texture everywhere except within a radius of a `uCursor` uniform, where it samples the color texture — smooth-stepped edge for a soft falloff rather than a hard circle.
   - Use for the hero specifically if you want a more premium/soft-edged feel; fall back to CSS approach elsewhere for performance.

**Applies to:** your hero photo (explicitly requested) — recommend extending the same "grayscale world, color on touch" rule consistently to hover states on buttons/icons throughout, so the cursor mechanic and the button-hover-color rule feel like one unified system rather than two separate ideas.

**Mobile fallback:** no cursor exists on touch — buttons should default to their color-revealed state on tap/focus instead (don't leave mobile users unable to see the color states at all).

---

## 7. Transition & Motion Inventory (summary)

| Transition | Technique |
|---|---|
| Hero photo entrance | Spring/ease-out translateY, staggered after "DEVELOPER" text mounts |
| Hero → About | Pinned ScrollTrigger, full-black panel + clip-path mask reveal |
| About card entrance | R3F drop-in + idle pendulum sway + mouse-parallax tilt |
| About → Projects | Pinned marquee "strip cutter" interstitial, scroll-velocity-linked |
| Projects card hover | Animated glow stroke (SVG or box-shadow keyframe) |
| Project card → detail page | Shared-element/morph transition (Framer Motion `layoutId`) |
| Skills hover | Label→logo crossfade + brand-color glow, no layout shift |
| All buttons | Grayscale → brand/accent color on hover, consistent easing curve |
| Cursor | Lerped circular follower; clip-path or shader colorization |

---

## 8. Non-Functional Requirements
- **Accessibility:** honor `prefers-reduced-motion`; ensure focus states exist for keyboard users (glass nav, buttons, skill grid, social icons) even though hover is the primary showcased interaction; sufficient contrast for body text despite the monochrome palette.
- **Performance:** code-split the Three.js/R3F bundle so it doesn't block first paint of the Hero; target < 3s LCP on a throttled 4G profile.
- **SEO:** Next.js metadata per project route (title/description/OG image) so individual project pages are shareable/indexable.
- **Responsiveness:** every custom interaction (3D card, horizontal scroll, cursor colorization) needs a defined mobile/touch behavior — not just "hide on mobile."
- **CV download:** static, versioned PDF asset; update process should be "replace file in `/public`," no rebuild logic needed.

---

## 9. Build Phases (suggested for OpenCode execution)

1. **Foundation:** Next.js scaffold, design tokens, typography, Lenis smooth scroll setup, glass nav shell (static first).
2. **Hero + cursor system:** photo entrance animation, "DEVELOPER" type, cursor colorization proof-of-concept on the hero photo.
3. **Hero→About transition + About section:** black-wipe transition, 3D hanging card (start with a static plane + texture before adding sway physics), paragraph layout.
4. **Strip-cutter transition.**
5. **Projects:** horizontal scroll gallery, hover glow, project data model, dynamic `[slug]` route + shared-element transition.
6. **Skills grid** with logo/color hover data-driven system.
7. **Testimonials placeholder + Connect/footer** (social buttons, email form, "Let's Connect" hero-style heading).
8. **Polish pass:** reduced-motion fallbacks, mobile behavior for all custom interactions, performance audit, Lighthouse pass, CV download wiring, deploy to Vercel.

---

## 10. Success Criteria
- A first-time visitor scrolls past the hero within ~5 seconds without prompting (hero is compelling enough alone).
- No two consecutive section transitions feel like the same animation pattern reused.
- Every hover-to-color moment feels consistent (same easing, same "reveal" logic) across cursor, buttons, and skills — it reads as one designed system, not several bolted-together effects.
- Site remains usable and performant with all animation on a mid-range laptop and a modern mobile device.
- Each project has its own real, shareable URL with full detail content.
