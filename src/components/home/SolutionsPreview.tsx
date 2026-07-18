"use client";

import { ArrowUpRight, Phone, Radio, Workflow } from "lucide-react";
import { SOLUTIONS } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { SmartLink } from "@/components/ui/SmartLink";

const ICONS = {
  workflow: Workflow,
  phone: Phone,
  outbound: Radio,
} as const;

export function SolutionsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <SectionHeading
        eyebrow="Solutions"
        title="Three pillars of modern operations"
        description="Focused systems for automation, voice, and high-volume outbound—built to work together."
      />

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
        {SOLUTIONS.map((solution) => {
          const Icon = ICONS[solution.icon];
          return (
            <StaggerItem key={solution.id}>
              <SmartLink
                href={solution.href}
                className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift focus-ring"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-dark">
                  {solution.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {solution.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn More
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </SmartLink>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
