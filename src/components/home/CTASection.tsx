"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT_CHANNELS, SITE } from "@/lib/constants";

export function CTASection() {
  const whatsapp = CONTACT_CHANNELS.find((c) => c.id === "whatsapp");
  const bookingUrl = SITE.bookingUrl;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] bg-dark px-8 py-16 text-center sm:px-12 sm:py-20"
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/4 size-64 rounded-full bg-primary/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-1/4 size-64 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Next step
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Book a free discovery call
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            In 20–30 minutes we map your bottlenecks and recommend one clear path—
            automation, phone systems, or outbound infrastructure. No obligation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {bookingUrl ? (
              <Button href={bookingUrl} external size="lg">
                Book a free call
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button href="/contact" size="lg">
                Book Consultation
                <ArrowRight className="size-4" />
              </Button>
            )}
            {whatsapp ? (
              <Button
                href={whatsapp.href}
                external
                variant="secondary"
                size="lg"
                className="border-0"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </Button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
