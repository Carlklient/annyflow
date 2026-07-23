"use client";

import { CONTACT_CHANNELS, FOOTER_LINKS, SITE } from "@/lib/constants";
import { ContactPills } from "@/components/ui/ContactPills";
import { SmartLink } from "@/components/ui/SmartLink";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-dark text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="dark" size="lg" animated />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE.tagline}. Enterprise systems that feel effortless.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              Social
            </h3>
            <div className="mt-4 [&_a]:border-white/10 [&_a]:bg-white/5 [&_a]:text-white [&_a]:hover:border-primary/40">
              <ContactPills size="sm" />
            </div>
            <p className="mt-4 text-sm text-white/45">
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-primary">
                {SITE.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <SmartLink
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-primary"
              >
                {link.label}
              </SmartLink>
            ))}
            {CONTACT_CHANNELS.filter((c) => c.id !== "email").map((c) =>
              c.copyValue ? (
                <button
                  key={c.id}
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(c.copyValue!);
                    } catch {
                      /* ignore */
                    }
                    window.open("https://discord.com/app", "_blank", "noopener,noreferrer");
                  }}
                  className="text-sm text-white/40 transition-colors hover:text-primary"
                >
                  Discord · {c.copyValue}
                </button>
              ) : (
                <a
                  key={c.id}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 transition-colors hover:text-primary"
                >
                  {c.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
