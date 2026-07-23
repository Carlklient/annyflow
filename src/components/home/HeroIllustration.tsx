"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FileSpreadsheet, Headphones, Phone, PhoneCall } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOAT_CARDS = [
  {
    id: "phone",
    src: "/images/hero/phone.png",
    alt: "Business VoIP telephone",
    title: "Business Phone",
    detail: "IVR · Queues · CRM sync",
    icon: Phone,
    className:
      "left-0 top-[8%] w-[42%] sm:w-[34%] lg:left-[2%] lg:top-[12%] lg:w-[26%]",
    delay: 0.45,
    floatDelay: 0,
  },
  {
    id: "sheets",
    src: "/images/hero/spreadsheet.png",
    alt: "Spreadsheet dashboard on laptop",
    title: "Spreadsheets",
    detail: "Excel · Sheets · Live reports",
    icon: FileSpreadsheet,
    className:
      "right-0 top-[4%] w-[42%] sm:w-[34%] lg:right-[2%] lg:top-[8%] lg:w-[26%]",
    delay: 0.55,
    floatDelay: 0.4,
  },
  {
    id: "dialer",
    src: "/images/hero/dialer.png",
    alt: "Outbound dialer on smartphone",
    title: "Outbound Dialer",
    detail: "Predictive · Progressive · AI",
    icon: PhoneCall,
    className:
      "bottom-[2%] right-[4%] w-[40%] sm:w-[32%] lg:bottom-[6%] lg:right-[6%] lg:w-[24%]",
    delay: 0.7,
    floatDelay: 0.8,
  },
] as const;

export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden border-t border-border bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(16,185,129,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* Stage */}
        <div className="relative mx-auto aspect-[16/11] w-full max-w-5xl sm:aspect-[16/10]">
          {/* Animated connection paths */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            viewBox="0 0 1000 620"
            fill="none"
            aria-hidden
          >
            {[
              "M180 160 C 320 120, 400 200, 500 280",
              "M820 140 C 700 160, 620 220, 540 300",
              "M780 480 C 680 420, 600 380, 540 340",
              "M220 420 C 340 400, 420 360, 500 320",
            ].map((d, i) => (
              <g key={d}>
                <path d={d} stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 10" />
                <motion.path
                  d={d}
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    reduce
                      ? { pathLength: 1, opacity: 0.55 }
                      : { pathLength: [0, 1], opacity: [0.25, 0.95, 0.35] }
                  }
                  transition={{
                    duration: 3 + i * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8 + i * 0.2,
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Main featured scene */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
            className="absolute top-[18%] left-1/2 z-[2] w-[88%] max-w-[720px] -translate-x-1/2 sm:top-[16%] sm:w-[72%]"
          >
            <div className="group relative overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_24px_80px_rgba(17,24,39,0.12)] sm:rounded-[1.75rem]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/hero/scene.png"
                  alt="Call center agent with CRM dashboard, headset, and phone systems connected"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 720px"
                  className="object-cover object-center"
                />
                {/* Soft vignette for UI overlays */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
              </div>

              {/* Content overlays on featured scene */}
              <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-2 p-3 sm:flex-row sm:items-end sm:justify-between sm:p-5">
                <div className="rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-soft backdrop-blur-md sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Headphones className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-dark sm:text-sm">
                        Call center live
                      </p>
                      <p className="text-[10px] text-muted sm:text-xs">
                        Agents · CRM · Real-time dashboard
                      </p>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="inline-flex items-center gap-2 self-start rounded-full bg-dark px-3 py-1.5 text-[10px] font-semibold text-white sm:self-auto sm:px-3.5 sm:text-xs"
                  animate={reduce ? undefined : { opacity: [1, 0.75, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  42 active lines · syncing
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating product cards */}
          {FLOAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={reduce ? false : { opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: card.delay, ease: EASE }}
                className={`absolute z-[4] ${card.className}`}
              >
                <motion.article
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={{
                    duration: 4.2 + card.floatDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2 + card.floatDelay,
                  }}
                  whileHover={reduce ? undefined : { scale: 1.04, transition: { duration: 0.25 } }}
                  className="origin-center"
                >
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_48px_rgba(17,24,39,0.12)] transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(17,24,39,0.16)] sm:rounded-[1.25rem]">
                    <div className="relative aspect-square w-full bg-[#F8FAFC]">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 1024px) 40vw, 240px"
                        className="object-cover p-2 sm:p-3"
                      />
                    </div>
                    <div className="border-t border-border/80 bg-white px-3 py-2.5 sm:px-3.5 sm:py-3">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-3.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-dark sm:text-sm">
                            {card.title}
                          </p>
                          <p className="truncate text-[10px] text-muted sm:text-[11px]">
                            {card.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}

          {/* Status chips */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.45 }}
            className="absolute bottom-[18%] left-[2%] z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft sm:block lg:bottom-[22%] lg:left-[8%]"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
            Sheet → CRM auto-sync
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.45 }}
            className="absolute top-[42%] right-0 z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft lg:right-[4%] lg:block"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-accent" />
            Dialer ↔ Phone queue
          </motion.div>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-muted sm:mt-10"
        >
          See how phones, spreadsheets, call centers, and dialers connect into one
          AnnyFlow operation—built to feel like a product, not a patchwork.
        </motion.p>
      </div>
    </div>
  );
}
