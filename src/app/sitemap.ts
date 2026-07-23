import type { MetadataRoute } from "next";
import { SOLUTIONS } from "@/data/content";
import { CASE_STUDIES, GUIDES } from "@/data/growth";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/solutions`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/case-studies`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/guides`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/llms.txt`, lastModified, changeFrequency: "monthly", priority: 0.4 },
  ];

  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: `${base}/solutions/${s.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const caseStudyRoutes = CASE_STUDIES.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const guideRoutes = GUIDES.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...solutionRoutes, ...caseStudyRoutes, ...guideRoutes];
}
