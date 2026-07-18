"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] bg-dark px-8 py-16 text-center sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute -top-20 left-1/4 size-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 size-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to transform your business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/60">
            Tell us where operations slow down—we&apos;ll map the automation, phone, or outbound stack that fits.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" size="lg">
              Book Consultation
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
