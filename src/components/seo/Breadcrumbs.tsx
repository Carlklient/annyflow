import Link from "next/link";
import { SITE } from "@/lib/constants";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? {
            item: item.href.startsWith("http")
              ? item.href
              : `${SITE.url}${item.href}`,
          }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {item.href ? (
                <Link href={item.href} className="hover:text-primary focus-ring">
                  {item.label}
                </Link>
              ) : (
                <span className="text-dark">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
