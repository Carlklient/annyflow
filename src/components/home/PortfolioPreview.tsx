"use client";

import { ArrowUpRight } from "lucide-react";
import { FEATURED_PORTFOLIO } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";

export function PortfolioPreview() {
  // Duplicate for seamless infinite loop
  const track = [...FEATURED_PORTFOLIO, ...FEATURED_PORTFOLIO];

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Portfolio"
            title="Featured solutions that ship"
            description="Automation, spreadsheets, phone systems, and outbound—real platforms built for how modern businesses operate."
            className="md:max-w-xl"
          />
          <Button href="/portfolio" variant="secondary">
            View all projects
          </Button>
        </div>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-20" />

        <div className="portfolio-train overflow-hidden">
          <div className="animate-portfolio-train flex w-max gap-5 px-5 sm:gap-6 sm:px-8">
            {track.map((project, i) => (
              <article
                key={`${project.id}-${i}`}
                className="group flex w-[min(86vw,320px)] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift sm:w-[340px]"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-dark">
                  <ProjectVisual project={project} />
                  <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-dark shadow-soft">
                    {project.categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-base font-semibold text-dark sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.platforms.slice(0, 3).map((platform) => (
                      <span
                        key={`${platform}-${i}`}
                        className="rounded-full bg-background px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <SmartLink
                    href={`/portfolio#${project.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-dark transition-colors hover:text-primary focus-ring"
                  >
                    View Project
                    <ArrowUpRight className="size-4" />
                  </SmartLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
