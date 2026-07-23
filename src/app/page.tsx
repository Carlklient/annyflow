import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TechMarquee } from "@/components/home/TechMarquee";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name}: Business Automation, Spreadsheets, Phone Systems & Outbound Calling`,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TechMarquee />
      <SolutionsPreview />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
