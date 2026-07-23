"use client";

import { ArrowUpRight, Phone, Radio, Table2, Workflow } from "lucide-react";
import { SOLUTIONS } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { SmartLink } from "@/components/ui/SmartLink";

const ICONS = {
  workflow: Workflow,
  phone: Phone,
  outbound: Radio,
  spreadsheet: Table2,
} as const;

export function SolutionsPreview() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 prism-mesh" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Solutions"
          title="Four pillars of modern operations"
          description="Automation, spreadsheets, voice, and outbound—built to remove manual work and scale cleanly."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {SOLUTIONS.map((solution) => {
            const Icon = ICONS[solution.icon];
            const highlight = solution.id === "spreadsheet-automation";
            return (
              <StaggerItem key={solution.id}>
                <SmartLink
                  href={solution.href}
                  className={
                    highlight
                      ? "prism-border prism-sheen group relative flex h-full flex-col rounded-[1.5rem] p-7 shadow-lift transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow focus-ring"
                      : "prism-border prism-border-soft group relative flex h-full flex-col rounded-[1.5rem] p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift focus-ring"
                  }
                >
                  {highlight ? (
                    <span className="absolute top-4 right-4 z-[1] rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase shadow-soft backdrop-blur-sm">
                      Featured
                    </span>
                  ) : null}
                  <span className="relative z-[1] flex size-12 items-center justify-center rounded-2xl border border-white/50 bg-primary/10 text-primary shadow-soft backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative z-[1] mt-6 font-display text-xl font-semibold text-dark">
                    {solution.title}
                  </h3>
                  <p className="relative z-[1] mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {solution.description}
                  </p>
                  <span className="relative z-[1] mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn More
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </SmartLink>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
