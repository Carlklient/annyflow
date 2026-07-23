"use client";

import { Phone, Radio, Table2, Workflow } from "lucide-react";
import { SOLUTIONS } from "@/data/content";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const ICONS = {
  workflow: Workflow,
  phone: Phone,
  outbound: Radio,
  spreadsheet: Table2,
} as const;

export function SolutionsPageContent() {
  return (
    <div className="pt-28 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Solutions"
          title="Infrastructure for the way modern teams work"
          description="Four tightly scoped practice areas covering automation, spreadsheets, voice, and outbound, delivered with enterprise rigor."
        />
      </div>

      <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
        {SOLUTIONS.map((solution, index) => {
          const Icon = ICONS[solution.icon];
          const reverse = index % 2 === 1;

          return (
            <section
              key={solution.id}
              id={solution.id}
              className="scroll-mt-24 mx-auto max-w-7xl px-5 sm:scroll-mt-28 sm:px-8 lg:px-10"
            >
              <div
                className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <FadeIn className="lg:col-span-5" direction={reverse ? "left" : "right"}>
                  <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft sm:p-8 lg:sticky lg:top-28">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:size-14">
                      <Icon className="size-6 sm:size-7" />
                    </span>
                    <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-dark sm:mt-6 sm:text-3xl">
                      {solution.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                      {solution.description}
                    </p>
                    <div className="mt-6 sm:mt-8">
                      <Button href="/contact" className="w-full sm:w-auto">
                        Book free consultation
                      </Button>
                    </div>
                  </div>
                </FadeIn>

                <Stagger className="space-y-6 lg:col-span-7" stagger={0.08}>
                  {solution.items.map((group) => (
                    <StaggerItem key={group.title}>
                      <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-soft sm:p-7">
                        <h3 className="font-display text-lg font-semibold text-dark">
                          {group.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {group.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-text transition-colors hover:border-primary/30 hover:bg-primary/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
