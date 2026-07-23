"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Client outcomes"
          title="Trusted across thousands of deliveries"
          description="128+ projects shipped with strong reviews across automation, spreadsheets, voice, and outbound."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.06}>
              <motion.blockquote
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-6 shadow-soft sm:p-7"
              >
                <Quote className="size-8 text-primary/30" aria-hidden />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text sm:text-[15px]">
                  “{item.quote}”
                </p>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="font-display text-sm font-semibold text-dark">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {item.role} · {item.industry}
                  </p>
                </footer>
              </motion.blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
