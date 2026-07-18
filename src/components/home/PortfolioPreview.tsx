"use client";

import { ArrowUpRight } from "lucide-react";
import { FEATURED_PORTFOLIO } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";

export function PortfolioPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Portfolio"
            title="Featured automation solutions"
            description="Real platforms. Solution-based systems. Built for how modern businesses actually operate."
            className="md:max-w-xl"
          />
          <Button href="/portfolio" variant="secondary">
            View all projects
          </Button>
        </div>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {FEATURED_PORTFOLIO.map((project) => (
            <StaggerItem key={project.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative aspect-[16/11] overflow-hidden bg-dark">
                  <ProjectVisual project={project} />
                  <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-dark shadow-soft">
                    {project.categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-dark">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.platforms.slice(0, 3).map((platform) => (
                      <span
                        key={platform}
                        className="rounded-full bg-background px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <SmartLink
                    href={`/portfolio#${project.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-dark transition-colors hover:text-primary focus-ring"
                  >
                    View Project
                    <ArrowUpRight className="size-4" />
                  </SmartLink>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
