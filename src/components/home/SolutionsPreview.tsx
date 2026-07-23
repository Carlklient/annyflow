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
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Solutions"
          title="Four pillars of modern operations"
          description="Automation, spreadsheets, voice, and outbound built to remove manual work and scale cleanly."
        />

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {SOLUTIONS.map((solution) => {
            const Icon = ICONS[solution.icon];
            return (
              <StaggerItem key={solution.id}>
                <SmartLink
                  href={solution.href}
                  className="group flex h-full flex-col rounded-3xl border border-border/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift focus-ring"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-8 font-display text-xl font-semibold text-dark">
                    {solution.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {solution.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
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
