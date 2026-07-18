"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AUTOMATION_FILTERS,
  OUTBOUND_FILTERS,
  PHONE_FILTERS,
  PORTFOLIO,
  type AutomationSolutionType,
  type OutboundSolutionType,
  type PhoneSolutionType,
} from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { cn } from "@/lib/utils";
import { getLocationHash, scrollToHash } from "@/lib/hash-scroll";

type PillarTab = "automation" | "phone" | "outbound";
type AutomationFilter = (typeof AUTOMATION_FILTERS)[number]["id"];
type PhoneFilter = (typeof PHONE_FILTERS)[number]["id"];
type OutboundFilter = (typeof OUTBOUND_FILTERS)[number]["id"];

const PILLAR_TABS: { id: PillarTab; label: string }[] = [
  { id: "automation", label: "Business Automation" },
  { id: "phone", label: "Business Phone Systems" },
  { id: "outbound", label: "Outbound Calling" },
];

export function PortfolioGrid() {
  const [pillar, setPillar] = useState<PillarTab>("automation");
  const [automationFilter, setAutomationFilter] = useState<AutomationFilter>("all");
  const [phoneFilter, setPhoneFilter] = useState<PhoneFilter>("all");
  const [outboundFilter, setOutboundFilter] = useState<OutboundFilter>("all");

  const items = useMemo(() => {
    const byPillar = PORTFOLIO.filter((p) => p.pillar === pillar);

    if (pillar === "automation" && automationFilter !== "all") {
      return byPillar.filter(
        (p) => p.solutionType === (automationFilter as AutomationSolutionType)
      );
    }

    if (pillar === "phone" && phoneFilter !== "all") {
      return byPillar.filter((p) => p.solutionType === (phoneFilter as PhoneSolutionType));
    }

    if (pillar === "outbound" && outboundFilter !== "all") {
      return byPillar.filter(
        (p) => p.solutionType === (outboundFilter as OutboundSolutionType)
      );
    }

    return byPillar;
  }, [pillar, automationFilter, phoneFilter, outboundFilter]);

  useEffect(() => {
    const hash = getLocationHash();
    if (!hash) return;
    const project = PORTFOLIO.find((p) => p.id === hash);
    if (!project) return;
    setPillar(project.pillar);
    if (project.pillar === "automation") setAutomationFilter("all");
    if (project.pillar === "phone") setPhoneFilter("all");
    if (project.pillar === "outbound") setOutboundFilter("all");
    scrollToHash(hash);
  }, []);

  // Re-scroll after pillar/filter changes settle (deep links + in-page hashes)
  useEffect(() => {
    const hash = getLocationHash();
    if (!hash) return;
    if (!items.some((p) => p.id === hash)) return;
    scrollToHash(hash);
  }, [items]);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Portfolio"
          title="Business solutions that actually ship"
          description="Solution-based implementations across workflow platforms, CRMs, LMS, booking systems, AI automation, phone systems, and outbound infrastructure."
        />

        <div className="mt-10 -mx-5 overflow-x-auto px-5 hide-scrollbar sm:mx-0 sm:overflow-visible sm:px-0">
          <div
            className="flex min-w-max justify-start gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center"
            role="tablist"
            aria-label="Portfolio pillars"
          >
          {PILLAR_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={pillar === tab.id}
              onClick={() => {
                setPillar(tab.id);
                if (tab.id === "automation") setAutomationFilter("all");
                if (tab.id === "phone") setPhoneFilter("all");
                if (tab.id === "outbound") setOutboundFilter("all");
              }}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-ring",
                pillar === tab.id
                  ? "bg-dark text-white shadow-soft"
                  : "border border-border bg-white text-muted hover:text-dark"
              )}
            >
              {tab.label}
            </button>
          ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {pillar === "automation" && (
            <CategoryFilters
              key="automation-filters"
              label="Business automation categories"
              filters={AUTOMATION_FILTERS}
              active={automationFilter}
              onChange={setAutomationFilter}
            />
          )}

          {pillar === "phone" && (
            <CategoryFilters
              key="phone-filters"
              label="Business phone system categories"
              filters={PHONE_FILTERS}
              active={phoneFilter}
              onChange={setPhoneFilter}
            />
          )}

          {pillar === "outbound" && (
            <CategoryFilters
              key="outbound-filters"
              label="Outbound calling categories"
              filters={OUTBOUND_FILTERS}
              active={outboundFilter}
              onChange={setOutboundFilter}
            />
          )}
        </AnimatePresence>

        <motion.div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

function CategoryFilters<T extends string>({
  label,
  filters,
  active,
  onChange,
}: {
  label: string;
  filters: readonly { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 -mx-5 overflow-x-auto px-5 hide-scrollbar sm:mx-0 sm:overflow-visible sm:px-0"
      role="tablist"
      aria-label={label}
    >
      <div className="flex min-w-max justify-start gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={active === f.id}
          onClick={() => onChange(f.id)}
          className={cn(
            "min-h-11 shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-ring",
            active === f.id
              ? "bg-primary text-white shadow-soft"
              : "border border-border bg-white text-muted hover:border-primary/30 hover:text-dark"
          )}
        >
          {f.label}
        </button>
      ))}
      </div>
    </motion.div>
  );
}
