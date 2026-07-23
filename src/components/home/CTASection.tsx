"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT_CHANNELS, SITE } from "@/lib/constants";

export function CTASection() {
  const whatsapp = CONTACT_CHANNELS.find((c) => c.id === "whatsapp");
  const bookingUrl = SITE.bookingUrl;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="prism-border-dark prism-sheen relative overflow-hidden rounded-[1.75rem] px-8 py-16 text-center sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 prism-mesh-dark" aria-hidden />
        <div
          className="pointer-events-none absolute -top-20 left-1/4 size-64 rounded-full bg-primary/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-1/4 size-64 rounded-full bg-accent/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/2 right-1/3 size-40 -translate-y-1/2 rounded-full bg-sky-400/15 blur-3xl"
          aria-hidden
        />

        <div className="relative z-[1]">
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
                className="border-0 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </Button>
            ) : (
              <Button
                href="/portfolio"
                variant="secondary"
                size="lg"
                className="border-0 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
              >
                See our work
              </Button>
            )}
          </div>
          <p className="mt-5 text-xs text-white/40">
            Prefer email? Use the contact form—we usually reply within one business day.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
