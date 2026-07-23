"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const SCENES = [
  {
    src: "/images/hero/phone.png",
    label: "Business phone",
    alt: "Business telephone system",
  },
  {
    src: "/images/hero/spreadsheet.png",
    label: "Spreadsheets",
    alt: "Spreadsheet automation on laptop",
  },
  {
    src: "/images/hero/callcenter.png",
    label: "Call center",
    alt: "Call center headset and live calls",
  },
  {
    src: "/images/hero/dialer.png",
    label: "Outbound dialer",
    alt: "Outbound calling dialer on phone",
  },
] as const;

export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden border-t border-border bg-[#F8FAFC]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.1),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        {/* Connection line behind cards */}
        <div className="pointer-events-none absolute top-[42%] right-10 left-10 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" aria-hidden />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {SCENES.map((scene, i) => (
            <motion.figure
              key={scene.src}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE }}
              className="relative"
            >
              {/* Animated connector pulse between items */}
              {i < SCENES.length - 1 ? (
                <motion.span
                  aria-hidden
                  className="absolute top-1/2 -right-3 z-10 hidden size-2.5 -translate-y-1/2 rounded-full bg-primary lg:block"
                  animate={reduce ? undefined : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                />
              ) : null}

              <div className="overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-soft sm:rounded-[1.5rem]">
                <div className="relative aspect-square w-full bg-white">
                  <Image
                    src={scene.src}
                    alt={scene.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-sm font-semibold text-dark">
                {scene.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          className="mt-8 text-center text-sm text-muted sm:mt-10"
        >
          Phone systems, spreadsheets, call centers, and dialers—connected into one operation.
        </motion.p>
      </div>
    </div>
  );
}
