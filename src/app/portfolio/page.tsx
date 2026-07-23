import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Portfolio of Real Automation Projects",
  description:
    "Browse AnnyFlow portfolio projects spanning workflow platforms, Excel and Google Sheets, CRM systems, phone systems, and outbound calling.",
  openGraph: {
    title: "Portfolio | AnnyFlow",
    description:
      "Solution based systems with Excel, Google Sheets, Airtable, HubSpot, Make, n8n, and Zapier.",
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
