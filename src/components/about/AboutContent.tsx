"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const SPECIALTIES = [
  "Business Automation",
  "Spreadsheet Automation",
  "CRM Solutions",
  "Business Phone Systems",
  "Outbound Calling Infrastructure",
  "AI Business Solutions",
];

const VALUES = ["Innovation", "Integrity", "Efficiency", "Customer Success"];

export function AboutContent() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Intro header */}
        <FadeIn className="mb-12 max-w-2xl lg:mb-16">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">About</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            Meet the Founder
          </h1>
          <p className="mt-3 text-lg text-muted">Founder & Automation Solutions Architect</p>
        </FadeIn>

        {/* Equal-height two columns */}
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — portrait */}
          <FadeIn direction="right" className="h-full min-h-[320px] sm:min-h-[400px] lg:min-h-0">
            <div className="relative aspect-[4/5] h-auto min-h-[320px] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-auto sm:min-h-[400px] lg:h-full lg:min-h-full">
              <Image
                src="/images/founder.png"
                alt="Annybest, Founder of AnnyFlow"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_15%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent p-6 pt-24">
                <p className="font-display text-lg font-semibold text-white">Annybest</p>
                <p className="text-sm text-white/75">Founder · AnnyFlow</p>
              </div>
            </div>
          </FadeIn>

          {/* Right — story */}
          <FadeIn direction="left" className="h-full">
            <div className="flex h-full flex-col rounded-[1.75rem] border border-border bg-white p-7 shadow-soft sm:p-9 lg:p-10">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl font-semibold tracking-tight text-dark sm:text-3xl"
              >
                Hello, I&apos;m Annybest.
              </motion.h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>
                  I&apos;m the Founder of AnnyFlow—an automation and communications company built
                  to help modern businesses operate with clarity, speed, and control.
                </p>
                <p>
                  I founded AnnyFlow after recognizing that many businesses were held back by
                  manual processes, disconnected software, inefficient workflows, and poor
                  customer communication. I wanted to create a company that helps businesses
                  automate operations, connect their systems, and improve productivity through
                  modern technology.
                </p>
                <p>
                  Today, AnnyFlow partners with teams that need systems that actually scale—
                  without adding more complexity.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  I specialize in
                </p>
                <Stagger className="mt-3 flex flex-wrap gap-2" stagger={0.05}>
                  {SPECIALTIES.map((item) => (
                    <StaggerItem key={item}>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-text sm:text-sm">
                        <CheckCircle2 className="size-3.5 text-primary" />
                        {item}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-1">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="rounded-2xl bg-background p-5"
                >
                  <h3 className="font-display text-base font-semibold text-dark">Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    To help businesses streamline operations through intelligent automation and
                    modern communication solutions.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="rounded-2xl bg-background p-5"
                >
                  <h3 className="font-display text-base font-semibold text-dark">Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    To make AnnyFlow a trusted technology partner that empowers businesses with
                    scalable automation and communication systems.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="rounded-2xl bg-background p-5"
                >
                  <h3 className="font-display text-base font-semibold text-dark">Core Values</h3>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {VALUES.map((value) => (
                      <li
                        key={value}
                        className="inline-flex items-center gap-2 text-sm font-medium text-text"
                      >
                        <Sparkles className="size-3.5 text-accent" />
                        {value}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-dark px-8 py-14 text-center sm:mt-20 sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -top-16 left-1/4 size-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 -bottom-20 size-56 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              Let&apos;s Build Smarter Business Systems Together
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/60 sm:text-base">
              Ready to automate operations, connect your stack, or upgrade your communications?
              Let&apos;s talk.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" size="lg">
                Book free consultation
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg" className="border-0">
                See real projects
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
