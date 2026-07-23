import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/data/growth";
import { CTASection } from "@/components/home/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study" };
  return {
    title: study.title,
    description: study.challenge,
    alternates: { canonical: `${SITE.url}/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.challenge,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/case-studies/${study.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <article className="pt-24 pb-20 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case studies", href: "/case-studies" },
              { label: study.title },
            ]}
          />
          <p className="mt-8 text-sm font-semibold tracking-wide text-primary uppercase">
            {study.industry}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {study.title}
          </h1>

          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-dark">Challenge</h2>
            <p className="mt-3 leading-relaxed text-muted">{study.challenge}</p>
          </section>
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-dark">Approach</h2>
            <p className="mt-3 leading-relaxed text-muted">{study.approach}</p>
          </section>
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-dark">Results</h2>
            <ul className="mt-4 space-y-3">
              {study.results.map((r) => (
                <li key={r} className="flex gap-3 text-dark">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-dark">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-dark"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Start a similar project
            </Button>
            {study.relatedPortfolioId ? (
              <Button
                href={`/portfolio#${study.relatedPortfolioId}`}
                variant="secondary"
                size="lg"
              >
                Related portfolio piece
              </Button>
            ) : null}
          </div>

          <p className="mt-10 text-sm text-muted">
            <Link href="/case-studies" className="text-primary hover:underline">
              Back to all case studies
            </Link>
          </p>
        </div>
      </article>
      <CTASection />
    </>
  );
}
