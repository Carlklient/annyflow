"use client";

import { ArrowUpRight } from "lucide-react";
import { GUIDES } from "@/data/growth";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { SmartLink } from "@/components/ui/SmartLink";

export function GuidesPreview() {
  const featured = GUIDES.slice(0, 3);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Guides"
            title="Answers search and AI engines can cite"
            description="Practical explainers on 3CX, Vicidial, Excel automation, and workflow design."
            className="sm:max-w-xl"
          />
          <Button href="/guides" variant="secondary" className="shrink-0 self-start sm:self-auto">
            All guides
          </Button>
        </div>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.08}>
          {featured.map((guide) => (
            <StaggerItem key={guide.slug}>
              <SmartLink
                href={`/guides/${guide.slug}`}
                className="group block border-t border-border pt-6 focus-ring"
              >
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {guide.readMinutes} min read
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-dark group-hover:text-primary">
                  {guide.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {guide.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read guide
                  <ArrowUpRight className="size-4" />
                </span>
              </SmartLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
