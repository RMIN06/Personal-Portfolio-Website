"use client";

import { socials, SocialIcon } from "@/components/social-icons";
import { scrollToSection } from "@/lib/scroll";

const SOCIAL_LINKS: Record<string, string> = {
  whatsapp: "https://wa.me/923000000000",
  linkedin: "https://www.linkedin.com/in/ibrahimatfast",
  github: "https://github.com/ibrahimatfast",
  instagram: "https://www.instagram.com/ibrahimatfast",
  facebook: "https://www.facebook.com/muhammad.ibrahim.783390",
};

const EMAIL = "ibrahimsocial06@gmail.com";

export function Connect() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio contact from ${fd.get("name")}`
    );
    const body = encodeURIComponent(
      `${fd.get("message")}\n\nReply to: ${fd.get("email")}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="relative px-6 py-20 md:px-16 md:pt-40 md:pb-10">
      <section id="connect" className="mb-20 md:mb-32">
        <p className="mb-4 text-xs tracking-[0.3em] text-grey-2 uppercase">
          Get in touch
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
          Let&rsquo;s
          <br />
          Connect
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {Object.entries(socials).map(([name, def]) => (
              <a
                key={name}
                href={SOCIAL_LINKS[name]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="social-btn grid h-10 md:h-12 w-10 md:w-12 place-items-center rounded-full border border-white/10 transition-[color,box-shadow,border-color] duration-300"
                style={{ "--brand": def.brand } as React.CSSProperties}
              >
                <SocialIcon name={name} className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <input
                name="name"
                required
                placeholder="Name"
                className="rounded-2xl border border-white/10 bg-grey-1 px-4 py-3 text-sm outline-none placeholder:text-grey-2 focus:border-white/40"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-grey-1 px-4 py-3 text-sm outline-none placeholder:text-grey-2 focus:border-white/40"
              />
            </div>
            <textarea
              name="message"
              required
              rows={3}
              placeholder="Message"
              className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-grey-1 px-4 py-3 text-sm outline-none placeholder:text-grey-2 focus:border-white/40"
            />
            <button
              type="submit"
              className="mt-4 w-full sm:w-auto rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-grey-2 sm:flex-row">
        <p>© {new Date().getFullYear()} · All rights reserved</p>
        <button
          onClick={() => scrollToSection("#hero")}
          className="transition-colors hover:text-fg"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}