"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroIllustration } from "@/components/home/HeroIllustration";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-x-clip bg-background pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-24 size-[min(420px,70vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase"
        >
          AnnyFlow
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
          className="mt-5 font-display text-[2.25rem] font-semibold leading-[1.12] tracking-tight text-dark sm:text-5xl md:text-[3.5rem]"
        >
          Automation and calling infrastructure, engineered for scale.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Business automation, spreadsheets, phone systems, and outbound dialing—
          built so your operations run like modern software.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button href="/contact" size="lg" className="min-w-[200px]">
            Book free consultation
            <ArrowRight className="size-4" />
          </Button>
          <Button href="/portfolio" variant="secondary" size="lg" className="min-w-[180px]">
            See real projects
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
        className="relative mx-auto mt-14 w-full max-w-5xl px-5 sm:mt-16 sm:px-8 lg:mt-20 lg:px-10"
      >
        <HeroIllustration />
      </motion.div>
    </section>
  );
}
