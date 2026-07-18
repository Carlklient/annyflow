"use client";

import { TECH_LOGOS } from "@/lib/constants";

export function TechMarquee() {
  const logos = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <section className="relative border-y border-border/70 bg-white py-10" aria-label="Technologies">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 sm:gap-14">
          {logos.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 font-display text-lg font-semibold tracking-tight text-dark/35 transition-colors hover:text-dark/70 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
