import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOLUTIONS } from "@/data/content";
import { CTASection } from "@/components/home/CTASection";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.id === slug);
  if (!solution) return { title: "Solution" };
  return {
    title: solution.title,
    description: solution.description,
    alternates: { canonical: `${SITE.url}/solutions/${solution.id}` },
    openGraph: {
      title: `${solution.title} | ${SITE.name}`,
      description: solution.description,
    },
  };
}

export default async function SolutionPillarPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.id === slug);
  if (!solution) notFound();

  const others = SOLUTIONS.filter((s) => s.id !== solution.id);

  return (
    <>
      <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: solution.title },
            ]}
          />

          <p className="mt-8 text-sm font-semibold tracking-wide text-primary uppercase">
            Solution pillar
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {solution.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {solution.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Book free consultation
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg">
              See related projects
            </Button>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {solution.items.map((group) => (
              <div key={group.title} className="border-t border-border pt-6">
                <h2 className="font-display text-xl font-semibold text-dark">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-dark"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-semibold text-dark">
              Other pillars
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    className="font-medium text-primary hover:underline focus-ring"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
}
