"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { PROCESS_STEPS } from "@/data/growth";

export function ProcessSection() {
  return (
    <section className="border-t border-border bg-[#F8FAFC] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from discovery to handoff"
          description="No mystery timeline. Four steps so you always know what happens next."
        />

        <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {PROCESS_STEPS.map((item) => (
            <StaggerItem key={item.step}>
              <p className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
