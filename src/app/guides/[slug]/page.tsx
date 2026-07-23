import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/data/growth";
import { CTASection } from "@/components/home/CTASection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide" };
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `${SITE.url}/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    keywords: guide.keywords.join(", "),
    mainEntityOfPage: `${SITE.url}/guides/${guide.slug}`,
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
              { label: "Guides", href: "/guides" },
              { label: guide.title },
            ]}
          />
          <p className="mt-8 text-sm font-semibold tracking-wide text-muted uppercase">
            {guide.readMinutes} min read | Updated {guide.publishedAt}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{guide.description}</p>

          <div className="mt-12 space-y-12">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-dark">
                  {section.heading}
                </h2>
                {section.body.map((para) => (
                  <p key={para.slice(0, 40)} className="mt-4 leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-[#F8FAFC] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-dark">
              Want this built for your team?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Book a free discovery call. We map your stack and recommend one clear path.
            </p>
            <div className="mt-5">
              <Button href="/contact" size="lg">
                Book free consultation
              </Button>
            </div>
          </div>

          <p className="mt-10 text-sm text-muted">
            <Link href="/guides" className="text-primary hover:underline">
              Back to all guides
            </Link>
          </p>
        </div>
      </article>
      <CTASection />
    </>
  );
}
