"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactPills } from "@/components/ui/ContactPills";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { LogoMark } from "@/components/brand/Logo";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-x-clip pt-20">
      {/* Prism ambient mesh */}
      <div className="pointer-events-none absolute inset-0 prism-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 motion-safe:block" aria-hidden>
        <div className="absolute -top-24 -left-24 size-[min(420px,90vw)] animate-blob rounded-full bg-primary/20 blur-3xl" />
        <div
          className="absolute top-1/3 -right-20 size-[min(380px,85vw)] animate-blob rounded-full bg-sky-400/15 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 size-[min(320px,70vw)] animate-blob rounded-full bg-accent/15 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-8 px-5 py-10 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-16">
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full prism-border prism-border-soft px-3.5 py-2"
          >
            <LogoMark size={28} />
            <span className="font-display text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              AnnyFlow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[2rem] font-semibold leading-tight tracking-tight text-dark sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            Automation, spreadsheets, and calling infrastructure—engineered for scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            We design business automation, spreadsheet systems, phone platforms, and
            outbound dialing stacks that operate like modern software products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Book free consultation
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg" className="w-full sm:w-auto">
              See real projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 hidden sm:block"
          >
            <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">
              Reach us instantly
            </p>
            <ContactPills />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none lg:pl-4">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
