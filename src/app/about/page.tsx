import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Annybest, Founder of AnnyFlow—Automation Solutions Architect specializing in business automation, CRM, phone systems, and outbound calling.",
  openGraph: {
    title: "Meet the Founder · AnnyFlow",
    description:
      "Meet Annybest, Founder of AnnyFlow—building smarter automation and communication systems for modern businesses.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
