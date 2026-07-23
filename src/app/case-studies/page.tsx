import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/growth";
import { CTASection } from "@/components/home/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "AnnyFlow case studies covering CRM automation, Excel reporting pipelines, and 3CX phone rollouts with measurable outcomes.",
  alternates: { canonical: `${SITE.url}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case studies" },
            ]}
          />
          <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Anonymized engagements. Same playbooks we use for automation, spreadsheets,
            phone systems, and outbound.
          </p>

          <ul className="mt-14 space-y-8">
            {CASE_STUDIES.map((study) => (
              <li key={study.slug} className="border-t border-border pt-8">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {study.industry}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="mt-2 block font-display text-2xl font-semibold text-dark hover:text-primary focus-ring"
                >
                  {study.title}
                </Link>
                <p className="mt-3 max-w-3xl text-muted">{study.challenge}</p>
                <p className="mt-4 text-sm font-semibold text-dark">{study.results[0]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CTASection />
    </>
  );
}
