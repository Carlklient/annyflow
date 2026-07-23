import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/growth";
import { CTASection } from "@/components/home/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Free AnnyFlow guides on 3CX CRM sync, Excel to HubSpot automation, Vicidial setup, and business automation basics.",
  alternates: { canonical: `${SITE.url}/guides` },
};

export default function GuidesPage() {
  return (
    <>
      <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />
          <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            Guides
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Practical answers for search engines, AI assistants, and operators who need clear next
            steps.
          </p>

          <ul className="mt-14 grid gap-8 md:grid-cols-2">
            {GUIDES.map((guide) => (
              <li key={guide.slug} className="border-t border-border pt-6">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {guide.readMinutes} min read | {guide.publishedAt}
                </p>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="mt-2 block font-display text-xl font-semibold text-dark hover:text-primary focus-ring"
                >
                  {guide.title}
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-muted">{guide.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CTASection />
    </>
  );
}
