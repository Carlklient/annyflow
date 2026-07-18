"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/data/content";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { SmartLink } from "@/components/ui/SmartLink";

export function PortfolioCard({ project }: { project: PortfolioItem }) {
  const isPhone = project.pillar === "phone";
  const primaryLabel = isPhone ? "Technology" : project.pillar === "outbound" ? "Technology" : "Platforms";
  const secondaryLabel = isPhone || project.pillar === "outbound" ? "Capabilities" : "Automations";

  return (
    <motion.article
      id={project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group scroll-mt-28 flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-dark">
        <ProjectVisual project={project} />
        <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-dark shadow-soft">
          {project.categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-dark">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4">
          <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
            {primaryLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-text"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
            {secondaryLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.automations.map((item) => (
              <span
                key={item}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <SmartLink
          href="/contact"
          className="mt-6 inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-dark px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-dark/90 hover:shadow-lift focus-ring"
        >
          Book Consultation
          <ArrowUpRight className="size-4" />
        </SmartLink>
      </div>
    </motion.article>
  );
}
