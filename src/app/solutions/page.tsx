import type { Metadata } from "next";
import { SolutionsPageContent } from "@/components/solutions/SolutionsPageContent";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business automation, business phone systems, and outbound calling infrastructure from AnnyFlow.",
  openGraph: {
    title: "Solutions · AnnyFlow",
    description:
      "Business automation, business phone systems, and outbound calling infrastructure from AnnyFlow.",
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
