import type { Metadata } from "next";
import { SolutionsPageContent } from "@/components/solutions/SolutionsPageContent";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Solutions for Automation, Spreadsheets, Phones & Dialers",
  description:
    "AnnyFlow solutions for business automation, spreadsheet automation, business phone systems, and outbound calling infrastructure.",
  openGraph: {
    title: "Solutions | AnnyFlow",
    description:
      "Business automation, spreadsheet automation, business phone systems, and outbound calling infrastructure from AnnyFlow.",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsPageContent />
      <CTASection />
    </>
  );
}
