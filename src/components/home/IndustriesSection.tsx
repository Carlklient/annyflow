"use client";

import { INDUSTRIES } from "@/data/growth";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustriesSection() {
  return (
    <section className="border-y border-border bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Who we help"
          title="Built for teams that need systems, not more tools"
          description="We work across industries where operations, CRM, spreadsheets, and calling have to stay connected."
        />

        <div className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((item) => (
            <div key={item.label} className="border-l-2 border-primary/30 pl-4">
              <p className="font-display text-base font-semibold text-dark">{item.label}</p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
