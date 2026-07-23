"use client";

import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/growth";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { SmartLink } from "@/components/ui/SmartLink";

export function CaseStudiesPreview() {
  return (
    <section className="bg-[#F8FAFC] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Case studies"
            title="Real problems, measurable outcomes"
            description="Anonymized engagements showing how automation, spreadsheets, and phone systems change day to day work."
            className="sm:max-w-xl"
          />
          <Button href="/case-studies" variant="secondary" className="shrink-0 self-start sm:self-auto">
            All case studies
          </Button>
        </div>

        <Stagger className="mt-14 grid gap-8 lg:grid-cols-3" stagger={0.08}>
          {CASE_STUDIES.map((study) => (
            <StaggerItem key={study.slug}>
              <SmartLink
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift focus-ring"
              >
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {study.industry}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-dark">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                  {study.challenge}
                </p>
                <p className="mt-5 text-sm font-semibold text-primary">
                  {study.results[0]}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-dark">
                  Read case study
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </SmartLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
