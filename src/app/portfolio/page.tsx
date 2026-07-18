import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "AnnyFlow business automation portfolio—workflow platforms, CRM systems, LMS, booking, AI automation, phone systems, and outbound calling.",
  openGraph: {
    title: "Portfolio · AnnyFlow",
    description:
      "Solution-based automation systems with real platforms like HubSpot, Clio, Make, n8n, and Zapier.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioGrid />
      <CTASection />
    </>
  );
}
