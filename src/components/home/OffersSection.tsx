"use client";

import { ArrowUpRight } from "lucide-react";
import { OFFER_PACKAGES } from "@/data/growth";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { SmartLink } from "@/components/ui/SmartLink";

export function OffersSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Engagements"
          title="Clear starting points, not vague retainers"
          description="Pick the offer that matches your bottleneck. We scope the rest on a free discovery call."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2" stagger={0.08}>
          {OFFER_PACKAGES.map((offer) => (
            <StaggerItem key={offer.id}>
              <SmartLink
                href={offer.href}
                className="group flex h-full flex-col border-t border-border pt-6 transition-colors hover:border-primary/40 focus-ring"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-dark">
                    {offer.title}
                  </h3>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{offer.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-dark">
                  {offer.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-medium text-muted">
                  Ideal for: {offer.idealFor}
                </p>
              </SmartLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
