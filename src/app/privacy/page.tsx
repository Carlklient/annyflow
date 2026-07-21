import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects and uses information from the website and contact form.`,
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          align="left"
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
        />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Who we are</h2>
            <p className="mt-2">
              {SITE.name} (“we”, “us”) operates this website and related contact channels.
              You can reach us at{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-primary hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Information we collect</h2>
            <p className="mt-2">When you use the contact form, we collect:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Name, email address, and optional company name</li>
              <li>Your selected interest area and message content</li>
              <li>Basic technical data such as browser type and approximate time of submission (via hosting/analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">How we use information</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>To respond to inquiries and schedule consultations</li>
              <li>To improve the website experience and reliability</li>
              <li>To protect against spam and abuse</li>
            </ul>
            <p className="mt-3">We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Form delivery & processors</h2>
            <p className="mt-2">
              Contact submissions may be processed by email delivery services (for example Web3Forms)
              and hosted on Vercel. Analytics may be collected via Vercel Analytics to understand traffic
              and performance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Retention</h2>
            <p className="mt-2">
              Inquiry emails are kept as long as needed to handle your request and for ordinary business
              records, unless you ask us to delete them where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Your choices</h2>
            <p className="mt-2">
              Email us at{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-primary hover:underline">
                {SITE.email}
              </a>{" "}
              to request access, correction, or deletion of information you submitted through the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-dark">Updates</h2>
            <p className="mt-2">
              We may update this policy from time to time. The date at the top of this page will change
              when we do.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
