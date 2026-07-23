import { FAQ_ITEMS, SOLUTIONS } from "@/data/content";
import { SITE } from "@/lib/constants";

type JsonLdProps = {
  /** Extra page-level schema objects merged into the graph */
  extra?: Record<string, unknown>[];
};

export function JsonLd({ extra = [] }: JsonLdProps) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    description: SITE.description,
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: SITE.founder,
      jobTitle: "Founder and Automation Solutions Architect",
      worksFor: { "@id": `${SITE.url}/#organization` },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        availableLanguage: ["English"],
        url: `${SITE.url}/contact`,
      },
    ],
    sameAs: [
      SITE.telegram ? `https://t.me/${SITE.telegram}` : null,
      SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}` : null,
    ].filter(Boolean),
    areaServed: "Worldwide",
    knowsAbout: [
      "Business automation",
      "Spreadsheet automation",
      "CRM integration",
      "Business phone systems",
      "Outbound dialers",
      "Call center infrastructure",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#service`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/opengraph-image`,
    description: SITE.description,
    provider: { "@id": `${SITE.url}/#organization` },
    priceRange: "$$",
    serviceType: SOLUTIONS.map((s) => s.title),
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AnnyFlow Solutions",
      itemListElement: SOLUTIONS.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${SITE.url}${s.href.split("#")[0]}#${s.id}`,
        },
      })),
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE.url}/contact#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, professionalService, faqPage, ...extra],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
