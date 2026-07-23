import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TechMarquee } from "@/components/home/TechMarquee";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

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
