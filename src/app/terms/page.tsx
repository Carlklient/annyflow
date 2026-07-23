import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${SITE.name} website and requesting services.`,
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="left"
          eyebrow="Legal"
          title="Terms of Use"
          description={`Last updated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
        />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Agreement</h2>
            <p className="mt-2">
              By using this website, you agree to these terms. If you do not agree, please do not use
              the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Services</h2>
            <p className="mt-2">
              {SITE.name} provides business automation, spreadsheet automation, phone systems, and outbound calling
              infrastructure services. Website content is for general information. Project scope,
              timelines, and fees are confirmed separately in writing before work begins.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">No warranties on site content</h2>
            <p className="mt-2">
              The site is provided “as is.” Portfolio examples describe capabilities and prior
              solution patterns; results for your business may differ.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Acceptable use</h2>
            <p className="mt-2">
              Do not misuse the contact form, attempt to disrupt the site, or submit unlawful or
              harmful content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-primary hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
