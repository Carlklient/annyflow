"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { SmartLink } from "@/components/ui/SmartLink";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-x-clip bg-white pt-24 sm:pt-28">
      {/* Soft breathing glow — restrained atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute left-1/2 top-[18%] size-[min(520px,80vw)] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl"
          animate={reduce ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [0.92, 1.05, 0.92] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-display text-sm font-semibold tracking-[0.22em] text-primary uppercase"
        >
          AnnyFlow
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="mt-5 max-w-3xl font-display text-[2.35rem] font-semibold leading-[1.1] tracking-tight text-dark sm:text-5xl md:text-6xl lg:text-[4rem]"
        >
          Automate. Connect. Scale.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Business automation, spreadsheets, phone systems, and outbound calling—
          built so your operations run like modern software.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <Button href="/contact" variant="dark" size="lg" className="min-w-[200px] px-10">
            Get Started
          </Button>
          <SmartLink
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-medium text-dark transition-colors hover:text-primary focus-ring"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Play className="size-3.5 fill-current" />
            </span>
            See real projects
          </SmartLink>
        </motion.div>
      </div>

      {/* Dominant visual plane — generous space above */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="relative mx-auto mt-16 w-full max-w-5xl px-5 sm:mt-20 sm:px-8 lg:mt-24 lg:px-10"
      >
        <HeroIllustration />
      </motion.div>
    </section>
  );
}
